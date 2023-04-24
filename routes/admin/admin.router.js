const express = require('express');
const router = express.Router();
const loginRouter = require('./admin.connexion');
const devisRouter = require('./admin.devis');
const produitsRouter = require('./admin.produits');
const adminIsAuth = require("../../middleware/admin/admin.auth");
const adminLayout = require("../../middleware/admin/admin.layout");

router.use('/login',[adminLayout],loginRouter);
router.use('/devis',[adminLayout],devisRouter);
router.use('/produits',[adminLayout],produitsRouter);

module.exports = router;