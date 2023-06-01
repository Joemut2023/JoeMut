var express = require("express");
var nodemailer = require("nodemailer");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.locals.titre = "contact";
  res.render("default/contact");
});



router.post("/", async function (req, res, next) {
  const { cont_service, cont_email, cont_file, cont_msg } = req.body;

  try {
    if (
      cont_service === "" ||
      cont_email === "" ||
      cont_msg === ""
    ) {
      return res
        .status(404)
        .render("default/contact", {
          error: true,
          errorMsg: "remplissez tous les champs",
          //   info: false,
        });
    }
    else {

      const transporter = nodemailer.createTransport({
        name: process.env.NAME_EMAIL,
        host: process.env.HOST_EMAIL,
        port: process.env.PORT_EMAIL,
        secure: true,
        auth: {
          user: process.env.MAIL_ADRESSE,
          pass: process.env.PASSWORD_OVH,
        },
      });
      const mailOptions = {
        from: cont_email,
        to: process.env.MAIL_ADRESSE,
        subject: "Message du client depuis le site",
        html: `<div> <p>Service: ${cont_service}</p> <p>Email: ${cont_email}</p> <p>File :${cont_file}</p> <p>Message:${cont_msg}</p></div>`,
      };

      transporter
        .sendMail(mailOptions)
        .then(function (info) {
          console.log("Email sent: " + info.response);
          res.status(200).render("default/contact", {
            messages: "Votre message a été envoyé avec succès!",
            info: true,
            error: false
          });
          cont_service = "";
          cont_email = "";
          cont_file = "";
          cont_msg = "";

        })
        .catch(function (error) {
          console.log(error);
          res.status(400).render("default/contact", {
            error: true,
            errorMsg:
              "Une erreur s'est produite lors de l'envoi de votre message!" + error,
            info: false
          });

        });
    }


  } catch (error) {
    console.log(error);
    return res.status(500).render("default/contact", {

      error: true,
      errorMsg: "Une erreur est survenue! : " + error,
    });
  }
});

module.exports = router;
