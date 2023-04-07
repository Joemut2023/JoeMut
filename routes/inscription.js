const express = require('express');
const { M, MME } = require('../helpers/titre');
const router = express.Router()
const {Client} = require('../models');
let bcrypt = require("bcryptjs");
router.get('/',(req,res,next)=>{
    res.render('inscription/index')
})
router.post('/',async (req,res,next)=>{
    var {tit_id,cli_nom,cli_prenom,cli_mail,cli_pwd} = req.body;
    var errorMsg = '';
    if(cli_nom === '' || cli_prenom===''||cli_mail===''||cli_pwd==='') {
        return res.render('inscription/index',{
            error:true,
            errorMsg:'Veillez remplir tout les champs'
        });
    }
    const oldClient = await Client.findOne({
        where:{ cli_mail },
    });
    if (oldClient) {
        return res
            .status(409)
            .render('inscription/index',{
                error:true,
                errorMsg:'Un utilisateur existe déjà avec ce mail'
            });
    }
    tit_id = tit_id === 'M' ? M:MME
    pwdhashed = await bcrypt.hash(cli_pwd, 10);
    let client = await Client.create({tit_id,cli_nom,cli_prenom,cli_mail,cli_pwd:pwdhashed});
    req.session.userId = client.cli_id;
    res.redirect(301, `/mon-compte`);
})

module.exports = router