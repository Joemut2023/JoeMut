const express = require('express');
const router = express.Router();
const loginRouter = require('./admin.connexion');
const devisRouter = require('./admin.devis');
const produitsRouter = require('./admin.produits');
const categoriesRouter = require("./admin.categories");
const dashboardRouter = require('./admin.dashboard');
const adminIsAuth = require("../../middleware/admin/admin.auth");
const adminLayout = require("../../middleware/admin/admin.layout");

router.use('/login', loginRouter);
router.use('/devis', [adminLayout], devisRouter);
router.use('/produits', [adminLayout], produitsRouter);
router.use('/type-categories', [adminLayout], categoriesRouter);
router.use('/dashboard', [adminLayout], dashboardRouter);

module.exports = router;