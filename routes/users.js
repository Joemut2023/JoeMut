var express = require("express");
var router = express.Router();
const { Adresse, Client, Commande } = require("../models");
var moment = require('moment');


// exports.index = function (req, res) {
//   res.render('index', { moment: moment });
// }

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.locals.titre = "mon_compte";
  res.render("users/index");
});

//dynamisation : get all data userlogin and modify
router.get("/identite/", async function (req, res, next) {
  res.locals.titre = "identite";

  try {
    const clientSession = await Client.findOne({
      where: {
        cli_id: req.session.userId,
      },
    });
    // res.json({ clientSession });
    return res.render("users/identite", {
      clientSession,
    });
  } catch (error) {
    error = "une erreur est survenue";
    return res.render("users/identite", {
      error,
    });
  }
  // res.render("users/identite");
});


router.post("/identite/", async function (req, res, next) {

  const { prenom, nom, email, newPassword } = req.body;
  const id = req.session.userId

  try {
    const clientSession = await Client.findByPk(id)
    if (!clientSession) {
      return res.render("users/identite", {
        error: "Erreur interne du serveur",
      });
    }
    else {
      clientSession.cli_prenom = prenom
      clientSession.cli_nom = nom
      clientSession.cli_email = email
      clientSession.cli_password = newPassword

      await clientSession.save()
      return res.render("users/identite", {
        success: "Modification effectuée",
        clientSession
      });
    }
  } catch (error) {
    return res.render("users/identite", {
      error: "Erreur interne du serveur",
      error
    });
  }
});


router.get("/nouvelleAdresse", function (req, res, next) {
  res.locals.titre = "nouvelle adresse";
  res.render("users/nouvelleAdresse");
});

router.get("/editAdresse/:id", async function (req, res, next) {
  res.locals.titre = "edit adresse";
  try {
    const adressById = await Adresse.findOne({
      where: {
        adr_id: req.params.id,
      },
    });
    // res.json({ adressById });
    return res.render("users/editAdress", {
      adressById,
    });
  } catch (error) {
    error = "une erreur est survenue";
    return res.render("users/adresses", {
      error,
    });
  }
});

router.post("/editAdresse/:id", async function (req, res, next) {
  let error, success;
  const {
    adr_structure,
    adr_nom,
    adr_prenom,
    adr_societe,
    adr_adresse,
    adr_comp,
    adr_cp,
    adr_ville,
    adr_num_tva,
    adr_phone,
    adr_pays,
  } = req.body;

  try {
    const updateAdresse = await Adresse.update(
      {
        adr_structure,
        adr_nom,
        adr_prenom,
        adr_societe,
        adr_adresse,
        adr_comp,
        adr_cp,
        adr_ville,
        adr_num_tva,
        adr_phone,
        adr_pays,
      },
      {
        where: {
          adr_id: req.params.id,
        },
      }
    );
    success = "Modification effectuée";
    // return res.redirect(301, "/mon-compte/adresses");
  } catch (err) {
    error = "Erreur interne du serveur";
    return res.render("users/adresses", {
      error,
    });
  }
});

router.get("/deleteAdresse/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteAdresse = await Adresse.destroy({
      where: {
        adr_id: parseInt(id),
      },
    });
    const getAdresses = await Adresse.findAll({
      where: {
        cli_id: req.session.userId,
      },
    });
    return res.render("users/adresses", {
      deleteAdresse,
      getAdresses: getAdresses,
      success: true,
    });
  } catch (error) {
    return res.render("users/adresses", {
      error: "une erreur est survenue",
    });
  }
});

router.get("/adresses", async function (req, res, next) {
  try {
    const getAdresses = await Adresse.findAll({
      where: {
        cli_id: req.session.userId,
      },
    });
    // res.json({getAdresses})
    return res.render("users/adresses", {
      getAdresses,
    });
  } catch (error) {
    error = "une erreur est survenue";
    return res.render("users/adresses", {
      error,
    });
  }
});

router.post("/nouvelleAdresse", async (req, res) => {
  res.locals.titre = "nouvelle adresse";
  let error, success;
  const {
    adr_structure,
    adr_nom,
    adr_prenom,
    adr_societe,
    adr_adresse,
    adr_comp,
    adr_cp,
    adr_ville,
    adr_num_tva,
    adr_phone,
    adr_pays,
  } = req.body;
  const chekInput = (input) => {
    return input !== "" ? true : false;
  };
  if (
    chekInput(adr_nom) &&
    chekInput(adr_prenom) &&
    chekInput(adr_adresse) &&
    chekInput(adr_cp) &&
    chekInput(adr_ville) &&
    chekInput(adr_pays)
  ) {
    try {
      let adresse = Adresse.create({
        ...req.body,
        cli_id: req.session.userId,
      });
      if (adresse) {
        success = "Adresse ajouté!";
        return res.render("users/nouvelleAdresse", { success });
      }
    } catch (err) {
      error = "Erreur interne du serveur";
      return res.render("users/nouvelleAdresse", {
        error,
      });
    }
  } else {
    error = "Veillez remplir tout les champs obligatoire";
    return res.render("users/nouvelleAdresse", {
      error,
    });
  }
});
router.get("/donnee", function (req, res, next) {
  res.locals.titre = "informations";
  res.render("users/donnee");
});


router.get("/historique", async function (req, res, next) {
  res.locals.titre = "historique";

  const clientId = req.session.userId;

  try {
    const commandeByUser = await Commande.findAll({
      where: {
        cli_id: clientId
      }
    })

    if (commandeByUser.length === 0) {
      return res.render("users/historique", {
        error: true,
      });
    } else {
      return res.render("users/historique", {
        error: false,
        commandeByUser,
        moment: moment
      });
    }

  } catch (error) {
    const errorMessage = "Erreur interne du serveur";
    return res.render("users/historique", {
      error: errorMessage,
    });

  }
});



router.get("/reduction", function (req, res, next) {
  res.locals.titre = "reduction";
  res.render("users/reduction");
});
router.get("/avoirs", function (req, res, next) {
  res.locals.titre = "avoirs";
  res.render("users/avoirs");
});
router.get("/adresses", function (req, res, next) {
  res.locals.titre = "adresse";
  res.render("users/adresses");
});
router.get("/alert", function (req, res, next) {
  res.locals.titre = "alert";
  res.render("users/alert");
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  delete res.locals.user;
  res.redirect("/");
});

module.exports = router;
