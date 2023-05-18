var nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
/**
 * Envois mail devis
 * @param {*} document_name 
 * @param {*} cli_mail 
 */
module.exports = async (document_name,cli_mail,subject,html)=>{
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
            to: `${cli_mail}`,
            subject: subject,
            html: html,
            attachments: [
              {
                filename: `${document_name}.pdf`,
                path: path.join(
                  __dirname,
                  `../public/pdf/devis/${document_name}.pdf`
                ),
              },
            ],
          };
          transporter.sendMail(mailOptions).then(function (info) {
            console.log("Email sent: " + info.response);
          }).catch(error=>{
            console.log(error);
          });
    } catch (error) {
        console.log(error);
        console.log("erreur lors de l'envois du mail");
    }
}