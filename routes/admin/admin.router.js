const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const loginRouter = require('./admin.connexion');
const devisRouter = require('./admin.devis');
const produitsRouter = require('./admin.produits');
const categoriesRouter = require("./admin.categories")
const dashboardRouter = require('./admin.dashboard');
const panierRouter = require('./admin.panier');
const adminIsAuth = require("../../middleware/admin/admin.auth");
const adminLayout = require("../../middleware/admin/admin.layout");

router.use('/login', loginRouter);
router.use('/devis', [adminLayout], devisRouter);
router.use('/produits', [adminLayout], produitsRouter);
router.use('/dashboard', [adminLayout], dashboardRouter);
router.use('/paniers', [adminLayout], panierRouter);
router.use('/categories', [adminLayout], categoriesRouter)
router.use('/dashboard', [adminLayout], dashboardRouter);
=======
const loginRouter = require("./admin.connexion");
const devisRouter = require("./admin.devis");
const produitsRouter = require("./admin.produits");
const taillesRouter = require("./admin.taille");
const dashboardRouter = require("./admin.dashboard");
const adminIsAuth = require("../../middleware/admin/admin.auth");
const adminLayout = require("../../middleware/admin/admin.layout");

router.use("/login", loginRouter);
router.use("/devis", [adminLayout], devisRouter);
router.use("/produits", [adminLayout], produitsRouter);
router.use("/dashboard", [adminLayout], dashboardRouter);
router.use("/tailles/",[adminLayout], taillesRouter);
>>>>>>> a8a7e21 (feature/admin-taille : fix table tailles)

module.exports = router;
