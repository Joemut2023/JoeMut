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
const FlashMidleware= require("../../middleware/admin/admin.flash");
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
const ejs = require('ejs');
const path = require('path');

router.use("/login", loginRouter);
router.use("/devis", [adminLayout, adminIsAuth,FlashMidleware], devisRouter);
router.use("/produits", [adminLayout, adminIsAuth,FlashMidleware], produitsRouter);
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
router.use("/documents", [adminLayout, adminIsAuth,FlashMidleware],documentRouter);
router.get('/bon-essayage',async (req,res)=>{
    try {
        let view = await ejs.renderFile(path.join(__dirname, "../../mailTemplate/essayage.ejs"));
        return res.send(view);
    } catch (error) {
       // console.log(error);
        console.log("erreur rendue bon essayage");
    }
})
module.exports = router;
