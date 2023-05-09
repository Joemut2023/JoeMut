var createError = require("http-errors");
var creationRouter = require("./routes/creation");
var contactRouter = require("./routes/contact");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const ejsLayout = require("express-ejs-layouts");
var indexRouter = require("./routes/index");
var catalogueRouter = require("./routes/catalogue");
var promotionRouter = require("./routes/promotion");
var rechercheRouter = require("./routes/recherche");
var errorRouter = require("./routes/error");
var panierRouter = require("./routes/panier");
var articleRouter = require("./routes/article");
var nouvelleCollectionRouter = require("./routes/nouvelleCollection");
var usersRouter = require("./routes/users");
var inscriptionRouter = require("./routes/inscription");
var connexionRouter = require("./routes/connexion");
var commanderRouter = require("./routes/commander");
var fraisPortRouter = require("./routes/fraisPort");
var fraisDossier = require("./routes/fraisDossier");
var mailRouter = require("./routes/mail");
var auth = require("./middleware/auth");
var mensionLegaleRouter = require("./routes/mensionLegale");
var confirmationCommandeRouter = require("./routes/confirmationCommande");
var devisRouter = require("./routes/devis");
var panierDetailRouter = require("./routes/panierDetail");
var codePromoRouter = require("./routes/codepromo");
// const AdminJS = require("adminjs");
// const AdminJSExpress = require("@adminjs/express");
// const AdminJSSequelize = require("@adminjs/sequelize");
const sessions = require("express-session");
const db = require("./models");
//const { Components, componentLoader } = require("./admin/ComponentLoader");
const getCategorie = require("./middleware/categorie");
const setAuthorizedUser = require("./middleware/setAuthorizedUser");
const getPanierDetail = require("./middleware/getPanierDetail");
const layout = require("./middleware/layout");
var app = express();
var adminRouter = require("./routes/admin/admin.router");
require("./config/db").sync();
const oneDay = 1000 * 60 * 60 * 24;
// view engine setup

app.use(getCategorie);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(ejsLayout);
//app.set("layout", path.join(__dirname, "views/layout/layout"));
//app.set("layout extractStyles", true);
//app.set("layout extractScripts", true);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(setAuthorizedUser);
app.use(getPanierDetail);
app.use("/", [layout], indexRouter);
app.use("/creation", [layout], creationRouter);
app.use("/contact", [layout], contactRouter);
app.use("/catalogue", [layout], catalogueRouter);
app.use("/promotion", [layout], promotionRouter);
app.use("/recherche", [layout], rechercheRouter);
app.use("/article", [layout], articleRouter);
app.use("/nouvelleCollection", [layout], nouvelleCollectionRouter);
app.use("/mon-compte", [auth, layout], usersRouter);
app.use("/panier", [auth, layout], panierRouter);
app.use("/inscription", [layout], inscriptionRouter);
app.use("/connexion", [layout], connexionRouter);
app.use("/commander", [auth, layout], commanderRouter);
app.use("/mensionLegale", [layout], mensionLegaleRouter);
app.use("/confirmation-commande", [auth, layout], confirmationCommandeRouter);
app.use("/devis", [layout], devisRouter);
app.use("/fraisPort", [layout], fraisPortRouter);
app.use("/error", [layout], errorRouter);
app.use("/fraisDossier", [layout], fraisDossier);
app.use("/panierDetail", [auth, layout], panierDetailRouter);
app.use("/mail", [layout], mailRouter);
app.use("/admin", [layout], adminRouter);
app.use("/codePromo", [layout], codePromoRouter);

// AdminJS.registerAdapter({
//   Resource: AdminJSSequelize.Resource,
//   Database: AdminJSSequelize.Database,
// });
// const admin = new AdminJS({
//   //resources:[Categorie]
//   dashboard: {
//     component: AdminJS.bundle("admin/pages-components/dashboard"),
//   },
//   databases: [db],
//   branding: {
//     companyName: "AES",
//     withMadeWithLove: false,
//     logo: "/images/logo.png",
//     favicon: "/images/favicon.ico",
//   },
// });
// const adminRouter = AdminJSExpress.buildRouter(admin);
// app.use(admin.options.rootPath, adminRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  res.status(404).render("error/404");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
