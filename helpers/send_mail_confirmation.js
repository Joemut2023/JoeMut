var nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const { Document } = require("../models");
const { DEVIS } = require("./utils_const");
const generate_pdf_func = require("./generate_pdf_func");
const send_mail_func = require("./send_mail_func");

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
  try {
    //CREATION DU DOCUMENT EN BDD
    const document = await Document.create({
      tdo_id: DEVIS,
      com_id: commande.com_id,
      doc_date: new Date(new Date().setDate(new Date().getDate()))
    });
    const DOCUMENT_NAME = `DEV-${document.doc_id}-${commande.com_num.trimStart()}`
    const updatedDocument = await Document.update({
      doc_libelle:`${DOCUMENT_NAME}`,
      doc_ref:`${DOCUMENT_NAME}`
    },{where:{doc_id:document.doc_id}});

    // CREATION DU PDF
    await generate_pdf_func(`${process.env.APP_URL}devis/${commande.com_id}`, `../public/pdf/devis/${DOCUMENT_NAME}.pdf`);
    await send_mail_func(DOCUMENT_NAME,commande.Client.cli_mail,"[AIGUILLE EN SCENE] Confirmation de commande",html);

  } catch (error) {
    console.log(error);
  }
};
