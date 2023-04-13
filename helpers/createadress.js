const {Adresse} = require('../models');

module.exports = async (req,res,view,redirect=false)=>{
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
            if (redirect) {
                return res.redirect(301, view);
            }
            return res.render(view, { success });
          }
        } catch (err) {
            res.status(500).render("error/serverError", {
                error: true,
                errorMsg: "Une erreur est survenue!",
                detailError: error,
            });
        }
      } else {
        error = "Veillez remplir tout les champs obligatoire";
        return res.render(view, {
          error,
        });
      }
}