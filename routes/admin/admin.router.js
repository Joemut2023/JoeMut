const express = require("express");
const router = express.Router();
const loginRouter = require('./admin.connexion');
const devisRouter = require('./admin.devis');
const produitsRouter = require('./admin.produits');
const dashboardRouter = require('./admin.dashboard');
const panierRouter = require('./admin.panier');
const taillesRouter = require("./admin.taille");


router.use('/login',loginRouter);
router.use('/devis',[adminLayout],devisRouter);
router.use('/produits',[adminLayout],produitsRouter);
router.use('/dashboard',[adminLayout],dashboardRouter);
router.use('/paniers',[adminLayout],panierRouter);
router.use("/tailles/",[adminLayout], taillesRouter);

module.exports = router;
