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
    Quantite
  } = require("../models");
const { TVA } = require("../helpers/utils_const");
module.exports = async (commandeId,callback)=>{
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
        let essayage = await Essayage.findAll({where:{com_id:commande.com_id}});
        let modeLivraison = await Frais_port.findOne({where:{frp_id:commande.frp_id}})
        

        //create ref for a command
        const refCommande = commande.com_num;
         
        const panierDetails = await Panier_detail.findAll({
          include: [
            {
              model: Produit,
              include: [
                { model: Media, attributes: ["med_id", "med_ressource"] },
                { model: Tarif},
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
          
        let sous_totalCmd = 0 ;
        let sous_total = 0;
        let totalTTC = 0;
        let totalHT = 0 
        
        for (let index = 0; index < panierDetails.length; index++) {
          sous_totalCmd += panierDetails[index].pad_ttc * panierDetails[index].pad_qte;
          sous_total += panierDetails[index].pad_ht * panierDetails[index].pad_qte;
        }
        
        let taxe = sous_total *  TVA;
        
        let totalCmd = sous_total + commande.Frais_port.frp_ttc + commande.com_frais;
        // let total = sous_total + commande.Frais_port.frp_ht + commande.com_frais;
        // res.json({ panierDetails });
      
        let livraison = commande.Frais_port.frp_ht?commande.Frais_port.frp_ht:0 
        totalTTC =
          sous_total +
          commande.com_remise +
          commande.com_frais +
          taxe +
          livraison ;
          totalHT = sous_total + livraison + commande.com_frais
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

    }catch (error) {
        console.log(error);
    }
}