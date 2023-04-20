var nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

module.exports = async (res,req,commande) => {

    let ejsFile = fs.readFileSync(
      path.join(__dirname, "../mailTemplate/index.ejs"),
      "utf8"
    );

    let html = ejs.render(ejsFile, {
      commande: commande,
    });

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
         //   }
         // ],
       };
       transporter.sendMail(mailOptions).then(function (info) {
         console.log("Email sent: " + info.response);
       });
     } catch (error) {}
};
