var nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

module.exports = async (
  res,
  req,
  commande,
  adresseLiv,
  adresseFac,
  panierDetails,
  essayage,
  modeLivraison,
  sous_total,
  taxe,
  totalTTC
) => {
  let ejsFile = fs.readFileSync(
    path.join(__dirname, "../mailTemplate/index.ejs"),
    "utf8"
  );
  let ejsdevis = fs.readFileSync(
    path.join(__dirname, "../mailTemplate/devis.ejs"),
    "utf8"
  );

  let html = ejs.render(ejsFile, {
    commande: commande,
    adresseLiv: adresseLiv,
    adresseFac: adresseFac,
    panierDetails: panierDetails,
    modeLivraison: modeLivraison,
    essayage: essayage,
    sous_total: sous_total,
    taxe: taxe,
    totalTTC:totalTTC,
  });

  let pdf = ejs.render(ejsdevis, {
    commande: commande,
    adresseLiv: adresseLiv,
    adresseFac: adresseFac,
    panierDetails: panierDetails,
    modeLivraison: modeLivraison,
    essayage: essayage,
    sous_total: sous_total,
    taxe,
    totalTTC,
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
      from: "myindavictoire@gmail.com",
      to: "trigoyodila1996@gmail.com",
      subject: "[AIGUILLE EN SCENE] Confirmation de commande",
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