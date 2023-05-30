var nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
/**
 * Envois mail devis
 * @param {*} document_name 
 * @param {*} cli_mail 
 */
module.exports = async (document_name,document_path,cli_mail,subject,html)=>{
    try {
        // const transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //       user: "myindavictoire@gmail.com",
        //       pass: process.env.PASSWORD_NODEMAILER,
        //     },
        //   });

            const transporter = nodemailer.createTransport({
              name: "wcg-rdc.com",
              host: "SSL0.OVH.NET",
              port: 465,
              secure: true,
              auth: {
                user: process.env.MAIL_ADRESSE,
                pass: process.env.PASSWORD_OVH,
              },
            });
          const mailOptions = {
            from: process.env.MAIL_ADRESSE,
            to: `${cli_mail}`,
            subject: subject,
            html: html,
            attachments: [
              {
                filename: `${document_name}.pdf`,
                path: path.join(__dirname, document_path),
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