const express = require("express");
const router = express.Router();
const loginRouter = require("./admin.connexion");
const devisRouter = require("./admin.devis");
const produitsRouter = require("./admin.produits");
const typeCategoriesRouter = require("./admin.typeCategories");
const fraisPortRouter = require("./admin.fraisport");
const dashboardRouter = require("./admin.dashboard");
const adminIsAuth = require("../../middleware/admin/admin.auth");
const adminLayout = require("../../middleware/admin/admin.layout");
const panierRouter = require("./admin.panier");
const taillesRouter = require("./admin.taille");
const couleurRouter = require("./admin.couleurs");
const factureRouter = require("./admin.facture");
const adresseRouter = require("./admin.adresse");
const clientRouter = require("./admin.client");
const promoRouter = require("./admin.promo");
const applyRouter = require("./admin.apply");
const transporteurRouter = require("./admin.transporteur");
const categoriesRouter = require("./admin.categories")
const produitLocationRouter = require("./admin.produits.location")
const documentRouter = require("./admin.document")

router.use("/login", loginRouter);
router.use("/devis", [adminLayout, adminIsAuth], devisRouter);
router.use("/produits", [adminLayout, adminIsAuth], produitsRouter);
router.use("/dashboard", [adminLayout, adminIsAuth], dashboardRouter);
router.use("/paniers", [adminLayout, adminIsAuth], panierRouter);
router.use("/adresse", [adminLayout, adminIsAuth], adresseRouter);
router.use("/categories", [adminLayout, adminIsAuth], categoriesRouter);
router.use("/type-categories", [adminLayout, adminIsAuth], typeCategoriesRouter);
router.use("/dashboard", [adminLayout, adminIsAuth], dashboardRouter);
router.use("/tailles", [adminLayout, adminIsAuth], taillesRouter);
router.use("/couleurs/", [adminLayout, adminIsAuth], couleurRouter);
router.use("/frais-port", [adminLayout, adminIsAuth], fraisPortRouter);
router.use("/factures", [adminLayout, adminIsAuth], factureRouter);
router.use("/clients", [adminLayout, adminIsAuth], clientRouter);
router.use("/promo", [adminLayout, adminIsAuth], promoRouter);
router.use("/apply", [adminLayout, adminIsAuth], applyRouter);
router.use("/transporteurs", [adminLayout, adminIsAuth], transporteurRouter);
router.use("/produits-en-location", [adminLayout, adminIsAuth],produitLocationRouter);
router.use("/documents", [adminLayout, adminIsAuth],documentRouter);
module.exports = router;
