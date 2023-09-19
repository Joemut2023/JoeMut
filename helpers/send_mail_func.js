var nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const Logger = require("./Logger");
const { log } = require("console");
/**
 * Envois mail devis
 * @param {*} document_name 
 * @param {*} cli_mail 
 */
module.exports = async (document_name = null,document_path= null,cli_mail,subject,html)=>{
    try {
        // const transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //       user: "myindavictoire@gmail.com",
        //       pass: process.env.PASSWORD_NODEMAILER,
        //     },
        //   });

            const transporter = nodemailer.createTransport({
              service : "gmail",
              //name: process.env.NAME_EMAIL,
              host: "smtp.gmail.com",
              port: 587,
              secure: false,
              auth: {
                user: process.env.MAIL_ADRESSE,
                pass: process.env.PASSWORD_OVH,
              },
            });
          const mailOptions = {
            from: {
              name : "African's art",
              adress : process.env.MAIL_ADRESSE,
            },
            to: `${cli_mail}`,
            subject: subject,
            html: html,
            // attachments: [
            //   {
            //     filename: `${document_name}.pdf`,
            //     path: path.join(__dirname, document_path),
            //   },
            // ],
          };
          transporter.sendMail(mailOptions).then(function (info) {
            console.log("Email sent: " + info.response);
          }).catch(error=>{
            Logger.error(error.stack)
          });

          const mailOptionsAdmin = {
            from: process.env.MAIL_ADRESSE,
            to: process.env.MAIL_ADRESSE,
            subject: "African's art" + " " + " order confirmation",
            html: html,
            attachments: [
              {
                filename: `${document_name}.pdf`,
                path: path.join(__dirname, document_path),
              },
            ],
          };
          transporter.sendMail(mailOptionsAdmin).then(function (info) {
            console.log("Email sent: " + info.response);
          }).catch(error=>{
            Logger.error(error.stack)
          });
    } catch (error) {
      //console.log("dssssssssssssssssssssssssssssssssss");
        // console.log(error);
        // console.log("erreur lors de l'envois du mail");
        Logger.error(error.stack)
    }
}