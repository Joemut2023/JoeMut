var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const sass = require("node-sass");

router.get("/", (req, res, next) => {
  res.locals.titre = "mail";
  res.render("mail/index", {});
});
router.post("/", async function (req, res) {
  // var mail = req.body.mail;
  // read EJS file
  let ejsFile = fs.readFileSync(
    path.join(__dirname, "../mailTemplate/index.ejs"),
    "utf8"
  );
  // console.log(ejsFile);
  // render EJS file
  let html = ejs.render(ejsFile, {
    commande: "sele",
  });

  // compile Sass
  // let css = sass
  //   .renderSync({
  //     file: path.join(__dirname, "../assets/scss/pages/mail.scss"),
  //   })
  //   .css.toString();
  // console.log(css);

  // let variable = sass.renderSync
  //   .renderSync({
  //     file: path.join(__dirname, "../assets/scss/variables.scss"),
  //   })
  //   .css.toString();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "myindavictoire@gmail.com",
        pass: process.env.PASSWORD_NODEMAILER,
      },
    });
    const mailOptions = {
      from: "trigoyodila1996@gmail.com",
      to: "seleshabani4@gmail.com",
      subject: "Message du client depuis le site",
      text: "Hello",
      html: html,
      // attachments: [
      //   {
      //     filename: "mail.scss",
      //     content: css,
      //     contentType: "text/css",
      //   },
      //   // {
      //   //   filename: "../assets/scss/pages/mail.scss",
      //   //   content: variable,
      //   //   contentType: "text/css",
      //   // },
      // ],
    };

    transporter.sendMail(mailOptions).then(function (info) {
      console.log("Email sent: " + info.response);
      res.status(200).render("mail/index", {
        messages: "Votre message a été envoyé avec succès!",
        info: true,
        error: false,
      });
    });
  } catch (error) {}
});
module.exports = router;
