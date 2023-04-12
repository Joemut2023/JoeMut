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
var panierRouter = require("./routes/panier");
var articleRouter = require("./routes/article");
var nouvelleCollectionRouter = require("./routes/nouvelleCollection");
var usersRouter = require("./routes/users");
var inscriptionRouter = require("./routes/inscription");
var connexionRouter = require("./routes/connexion");
var commanderRouter = require("./routes/commander");
var fraisPortRouter = require("./routes/fraisPort");
var auth = require("./middleware/auth");
var mensionLegaleRouter = require("./routes/mensionLegale");
var confirmationCommandeRouter = require("./routes/confirmationCommande");
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
const sessions = require("express-session");
const db = require("./models");
const { Components, componentLoader } = require("./admin/ComponentLoader");
const getCategorie = require("./middleware/categorie");
const setAuthorizedUser = require("./middleware/setAuthorizedUser");
var app = express();

require("./config/db").sync();
const oneDay = 1000 * 60 * 60 * 24;
// view engine setup

app.use(getCategorie);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(ejsLayout);
app.set("layout", path.join(__dirname, "views/layout/layout"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(setAuthorizedUser);
app.use("/", indexRouter);
app.use("/creation", creationRouter);
app.use("/contact", contactRouter);
app.use("/catalogue", catalogueRouter);
app.use("/promotion", promotionRouter);
app.use("/recherche", rechercheRouter);
app.use("/article", articleRouter);
app.use("/nouvelleCollection", nouvelleCollectionRouter);
app.use("/mon-compte", auth, usersRouter);
app.use("/panier", panierRouter);
app.use("/inscription", inscriptionRouter);
app.use("/connexion", connexionRouter);
app.use("/commander", commanderRouter);
app.use("/mensionLegale", mensionLegaleRouter);
app.use("/confirmation-commande", confirmationCommandeRouter);
app.use("/fraisPort", fraisPortRouter);

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});
const admin = new AdminJS({
  //resources:[Categorie]
  dashboard: {
    component: AdminJS.bundle("admin/pages-components/dashboard"),
  },
  databases: [db],
  branding: {
    companyName: "AES",
    withMadeWithLove: false,
    logo: "/images/logo.png",
    favicon: "/images/favicon.ico",
  },
});
const adminRouter = AdminJSExpress.buildRouter(admin);
app.use(admin.options.rootPath, adminRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
