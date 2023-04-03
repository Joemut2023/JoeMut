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
var nouvelleCollectionRouter = require("./routes/nouvelleCollection");
var usersRouter = require("./routes/users");
var connexionUser = require("./routes/connexion");
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSSequelize = require("@adminjs/sequelize");
const db = require("./models");
const { Components, componentLoader } = require("./admin/ComponentLoader");
var app = express();
require("./config/db").sync();

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

console.log(Components.Dashboard);
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

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(ejsLayout);
app.set("layout", path.join(__dirname, "views/layout/layout"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(admin.options.rootPath, adminRouter);
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/creation", creationRouter);
app.use("/contact", contactRouter);
app.use("/catalogue", catalogueRouter);
app.use("/promotion", promotionRouter);
app.use("/recherche", rechercheRouter);
app.use("/nouvelleCollection", nouvelleCollectionRouter);
app.use("/mon-compte", usersRouter);
app.use("/connexion", connexionUser);
app.use("/panier", panierRouter);

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
