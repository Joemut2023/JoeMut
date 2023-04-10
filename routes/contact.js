var express = require("express");
var nodemailer = require("nodemailer");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.render("default/contact");
});

router.post("/", function(req, res, next) {
    const { cont_service, cont_email, cont_file, cont_msg } = req.body;
  

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "myindavictoire@gmail.com",
                pass: process.env.PASSWORD_NODEMAILER,
            },
        });

        const mailOptions = {
            from: cont_email,
            to: "myindavictoire@gmail.com",
            subject: "Message du client depuis le site",
            html: `<div> <p>Service: ${cont_service}</p> <p>Email: ${cont_email}</p> <p>File :${cont_file}</p> <p>Message:${cont_msg}</p></div>`,
        };

        transporter
            .sendMail(mailOptions)
            .then(function(info) {
                console.log("Email sent: " + info.response);
                res.status(200).render("default/contact", {
                    messages: "Votre message a été envoyé avec succès!",
                    info:true
                });
            })
            .catch(function(err) {
                console.log(err);
                res.status(400).render("default/contact", {
                    error: true,
                    errorMsg: "Une erreur s'est produite lors de l'envoi de votre message!" + err,
                });
            });
    } catch (error) {
        console.log(err);
        res.status(500).render("default/contact", {
            error: true,
            errorMsg: "Une erreur est survenue! : " + error,
        });
    }
});

module.exports = router;