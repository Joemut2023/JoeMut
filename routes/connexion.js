const express = require('express')
const router = express.Router();
const {Client} = require('../models');
let bcrypt = require("bcryptjs");

router.get('/', async(req, res) => {
    res.render('connexion/index');
})
router.post('/',async (req,res)=>{
    const {cli_mail,cli_pwd} = req.body;
    try {
        const client = await Client.findOne({ where: { cli_mail } });
        if (!client) {
            return res.render('connexion/index',{
                error:true,
                errorMsg:'paire login / mot de passe invalide'
            })
        }
        const valid = await bcrypt.compare(cli_pwd, client.cli_pwd);
        if (!valid) {
            return res.render('connexion/index',{
                error:true,
                errorMsg:'paire login / mot de passe invalide'
            })
        }
        req.session.userId = client.cli_id;
        res.redirect(301, `/mon-compte`);
    } catch (error) {
        return res.render('connexion/index',{
            error:true,
            errorMsg:'Quelque chose s\'est mal passé pendant la reqûete'
        });
    }
})
module.exports = router;