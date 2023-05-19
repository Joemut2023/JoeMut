const express = require("express");
const {
  Document,
  Commande,
  Adresse,
  Panier_detail,
  Produit,
  Taille,
  Quantite,
  Client,
} = require("../../models");
const moment = require("moment");
const router = express.Router();
const loginRouter = require("./admin.connexion");
const devisRouter = require("./admin.devis");
const produitsRouter = require("./admin.produits");
const typeCategoriesRouter = require("./admin.typeCategories");
const fraisPortRouter = require("./admin.fraisport");
const dashboardRouter = require("./admin.dashboard");
const adminIsAuth = require("../../middleware/admin/admin.auth");
const adminLayout = require("../../middleware/admin/admin.layout");
const FlashMidleware = require("../../middleware/admin/admin.flash");
const panierRouter = require("./admin.panier");
const taillesRouter = require("./admin.taille");
const couleurRouter = require("./admin.couleurs");
const factureRouter = require("./admin.facture");
const adresseRouter = require("./admin.adresse");
const clientRouter = require("./admin.client");
const promoRouter = require("./admin.promo");
const applyRouter = require("./admin.apply");
const transporteurRouter = require("./admin.transporteur");
const categoriesRouter = require("./admin.categories");
const produitLocationRouter = require("./admin.produits.location");
const documentRouter = require("./admin.document");
const ejs = require("ejs");
const path = require("path");
const { log } = require("console");

router.use("/login", loginRouter);
router.use("/devis", [adminLayout, adminIsAuth, FlashMidleware], devisRouter);
router.use(
  "/produits",
  [adminLayout, adminIsAuth, FlashMidleware],
  produitsRouter
);
router.use("/dashboard", [adminLayout, adminIsAuth], dashboardRouter);
router.use("/paniers", [adminLayout, adminIsAuth], panierRouter);
router.use("/adresse", [adminLayout, adminIsAuth], adresseRouter);
router.use("/categories", [adminLayout, adminIsAuth], categoriesRouter);
router.use(
  "/type-categories",
  [adminLayout, adminIsAuth],
  typeCategoriesRouter
);
router.use("/dashboard", [adminLayout, adminIsAuth], dashboardRouter);
router.use("/tailles", [adminLayout, adminIsAuth], taillesRouter);
router.use("/couleurs/", [adminLayout, adminIsAuth], couleurRouter);
router.use("/frais-port", [adminLayout, adminIsAuth], fraisPortRouter);
router.use("/factures", [adminLayout, adminIsAuth], factureRouter);
router.use("/clients", [adminLayout, adminIsAuth], clientRouter);
router.use("/promo", [adminLayout, adminIsAuth], promoRouter);
router.use("/apply", [adminLayout, adminIsAuth], applyRouter);
router.use("/transporteurs", [adminLayout, adminIsAuth], transporteurRouter);
router.use(
  "/produits-en-location",
  [adminLayout, adminIsAuth],
  produitLocationRouter
);
router.use(
  "/documents",
  [adminLayout, adminIsAuth, FlashMidleware],
  documentRouter
);
router.get("/bon-essayage/:doc_id", async (req, res) => {
  const { doc_id } = req.params;
  try {
    let document = await Document.findOne({ where: { doc_id } });
    let commande = await Commande.findOne({
      where: { com_id: document.com_id },
    });
    let adresse = await Adresse.findOne({
      where: { adr_id: commande.com_adr_liv },
    });
    let panierDetails = await Panier_detail.findAll({
      include: [
        {
          model: Produit,
          attributes: ["pro_ref", "pro_libelle"],
          include: {
            model: Quantite,
            attributes: ["qua_nbre"],
            include: { model: Taille, attributes: ["tai_libelle"] },
          },
        },
      ],
      where: { pan_id: commande.pan_id },
    });
    let client = await Client.findOne({ where: { cli_id: commande.cli_id } });
    let view = await ejs.renderFile(
      path.join(__dirname, "../../mailTemplate/bon_essayage.ejs"),
      { document, commande, moment, adresse, panierDetails,client }
    );
    return res.send(view);
  } catch (error) {
    console.log("erreur rendue bon essayage");
  }
});
router.post("/delete-flash", async (req, res) => {
  delete req.session.flash;
  res.send("message flash supprimé");
});
module.exports = router;
