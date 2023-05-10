var nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const pdf = require("pdfkit");
const puppeteer = require("puppeteer");
const { Document } = require("../models");
const { DEVIS } = require("./utils_const");

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
  totalTTC,
  totalHT
) => {
  let ejsFile = fs.readFileSync(
    path.join(__dirname, "../mailTemplate/index.ejs"),
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
    totalTTC: totalTTC,
    totalHT: totalHT,
  });
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  page.isJavaScriptEnabled(false);
  await page.goto(`${process.env.APP_URL}devis/${commande.com_id}`, {
    timeout: 60000,
  });
  await page.pdf({
    path: path.join(
      __dirname,
      "../public/pdf/devis/" + commande.com_num.trimStart() + ".pdf"
    ),
  });
  await page.close();

  try {
    await Document.create({
      tdo_id: DEVIS,
      com_id: commande.com_id,
      doc_date: new Date(new Date().setDate(new Date().getDate())),
      doc_libelle:commande.com_num.trimStart()
    });
  } catch (error) {
    console.log(error);
  }
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
      to: `${commande.Client.cli_mail}`,
      subject: "[AIGUILLE EN SCENE] Confirmation de commande",
      html: html,
      attachments: [
        {
          filename: commande.com_num.trimStart() + ".pdf",
          path: path.join(
            __dirname,
            "../public/pdf/devis/" + commande.com_num.trimStart() + ".pdf"
          ),
        },
      ],
    };
    transporter.sendMail(mailOptions).then(function (info) {
      console.log("Email sent: " + info.response);
    });
  } catch (error) {}
};
