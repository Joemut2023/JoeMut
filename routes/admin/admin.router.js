const express = require("express");
const router = express.Router();
const loginRouter = require("./admin.connexion");
const devisRouter = require("./admin.devis");
const produitsRouter = require("./admin.produits");
const categoriesRouter = require("./admin.categories");
const fraisPortRouter = require("./admin.fraisport")
const dashboardRouter = require('./admin.dashboard');
const adminIsAuth = require("../../middleware/admin/admin.auth");
const adminLayout = require("../../middleware/admin/admin.layout");
const panierRouter = require("./admin.panier");
const taillesRouter = require("./admin.taille");
const couleurRouter = require("./admin.couleurs");
const factureRouter = require("./admin.facture");

router.use("/login", loginRouter);
router.use("/devis", [adminLayout], devisRouter);
router.use("/produits", [adminLayout], produitsRouter);
router.use("/dashboard", [adminLayout], dashboardRouter);
router.use("/paniers", [adminLayout], panierRouter);
router.use("/categories", [adminLayout], categoriesRouter);
router.use("/dashboard", [adminLayout], dashboardRouter);
router.use("/tailles/", [adminLayout], taillesRouter);
router.use("/couleurs/", [adminLayout], couleurRouter);
router.use('/type-categories', [adminLayout], categoriesRouter);
router.use('/frais-port', [adminLayout], fraisPortRouter)
router.use("/factures", [adminLayout], factureRouter);

module.exports = router;
