const {
  Panier_detail,
  Produit,
  Client,
  Commande,
  Panier,
  Frais_port,
  Media,
  Tarif,
  Adresse,
  Frais_supp,
  Autre_frais,
  Essayage,
  Quantite,
} = require("../models");
const { TVA } = require("../helpers/utils_const");
const CommandeCalcul = require("./commandeData");
module.exports = async (commandeId, callback) => {
  let quantiteOfEachProduct = [];
  try {
    const allproducts = await Produit.findAll();
    let commande = await Commande.findByPk(commandeId, {
      include: [
        { model: Client, attributes: ["cli_mail", "cli_nom"] },
        { model: Frais_port },
      ],
    });
    let adresseLiv = await Adresse.findOne({
      where: { adr_id: commande.com_adr_liv },
    });
    let adresseFac = await Adresse.findOne({
      where: { adr_id: commande.com_adr_fac },
    });
    let essayage = await Essayage.findAll({
      where: { com_id: commande.com_id },
    });
    let modeLivraison = await Frais_port.findOne({
      where: { frp_id: commande.frp_id },
    });

    //create ref for a command
    const refCommande = commande.com_num;

    const panierDetails = await Panier_detail.findAll({
      include: [
        {
          model: Produit,
          include: [
            { model: Media, attributes: ["med_id", "med_ressource"] },
            { model: Tarif },
          ],
        },
      ],
      where: {
        pan_id: commande.pan_id,
      },
    });

    for (let index = 0; index < allproducts.length; index++) {
      const quantiteInitial = await Quantite.sum("qua_nbre", {
        where: {
          pro_id: allproducts[index].pro_id,
        },
      });
      quantiteOfEachProduct.push({
        id: allproducts[index].pro_id,
        qty: quantiteInitial,
      });
    }

    const produitsPopulaires = await Produit.findAll({
      limit: 16,
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ttc"] },
      ],
      where: {
        pro_en_avant: 1,
      },
    });

    let sous_totalCmd = 0;
    let sous_total = 0;
    let totalTTC = 0;
    let totalHT = 0;
    let CalculCommande = new CommandeCalcul(commande,panierDetails);
    sous_totalCmd = CalculCommande.calculPanierTTC();
    sous_total = CalculCommande.calculPanierHT();
    let taxe = CalculCommande.calculPanierTotalWithTVA();
    let totalCmd = CalculCommande.calculTotalCommande();
    let livraison = CalculCommande.calculCommandeLivraison();
    totalTTC = CalculCommande.calculTotalCommandeTTC();
    totalHT = CalculCommande.calculCommandeHT();
    return callback(
      commande,
      adresseLiv,
      adresseFac,
      panierDetails,
      essayage,
      modeLivraison,
      sous_total,
      taxe,
      totalTTC,
      totalHT,
      sous_totalCmd,
      produitsPopulaires,
      totalCmd,
      quantiteOfEachProduct,
      refCommande
    );
  } catch (error) {
    console.log(error);
  }
};
