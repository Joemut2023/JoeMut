const express = require('express');
const router = express.Router();
const ejs = require("ejs");
const path = require("path");
const { EMAIL, PASSWORD } = require('../../helpers/infoUser');
const {User} = require('../../models');
let bcrypt = require("bcryptjs");
//app.set("layout", path.join(__dirname, "views/layout/layout"));
//app.set("views", path.join(__dirname, "views/admin"));
router.get('/',async (req,res)=>{
    let view = await ejs.renderFile(path.join(__dirname, "../../views/admin/login/index.ejs"))
    res.send(view);
});
router.post('/',async function(req,res){
     let view = await ejs.renderFile(
       path.join(__dirname, "../../views/admin/login/index.ejs")
     );
    const {usr_email,usr_pwd} = req.body

    try {
        
        if(usr_email === "" || usr_pwd === "") {
           let result = await ejs.renderFile(path.join(__dirname, "../../views/admin/login/index.ejs"), {
               errorMssg: "remplissez tous les champs",
             }); 
            return res.send(result)
        }

        let user = await User.findOne({
          where: { usr_mail: usr_email },
        })

        if(!user){
          let result = await ejs.renderFile(
            path.join(__dirname, "../../views/admin/login/index.ejs"),
            {
              errorMssg: "mail ou mot de passe incorrect",
            }
          );
          return res.send(result);
        }

        const valid = await bcrypt.compare(usr_pwd, user.usr_pwd);

        if (!valid) {
          let result = await ejs.renderFile(
            path.join(__dirname, "../../views/admin/login/index.ejs"),
            {
              errorMssg: "mail ou mot de passe incorrect",
            }
          );
          return res.send(result);
        }
           //
        req.session.adminId = user.usr_id;
        res.redirect("/admin/devis");
    
    } catch (error) {
        console.log(error);
        let result = await ejs.renderFile(
            path.join(__dirname, "../../views/admin/login/index.ejs"),
            {
              errorMssg: "Erreur interne",
            }
        );
        return res.send(result);
    }
})
router.get('/deconnexion',async (req,res)=>{
  req.session.destroy();
  //delete res.locals.user;
  res.redirect("/admin/login");
})

module.exports = router;