const express = require('express');
const router = express.Router();
const ejs = require("ejs");
const path = require("path");
const { EMAIL, PASSWORD } = require('../../helpers/infoUser');
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
       if(usr_email !== EMAIL) {
         let result = await ejs.renderFile(
           path.join(__dirname, "../../views/admin/login/index.ejs"),
           {
             errorMssg: "mail ou mot de passe incorrect",
           }
         );
         return res.send(result);
       }
           if (usr_pwd !== PASSWORD) {
             let result = await ejs.renderFile(
               path.join(__dirname, "../../views/admin/login/index.ejs"),
               {
                 errorMssg: "mail ou mot de passe incorrect",
               }
             );
             return res.send(result);
           }
           //
          res.redirect("/admin/devis");
    
    } catch (error) {
        
    }
})

module.exports = router;