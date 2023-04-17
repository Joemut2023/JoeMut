let bcrypt = require("bcryptjs");
const {Client,Panier,Panier_detail,Tarif,Produit} = require('../models');

module.exports = async (req,res,view,route)=>{
  // const { cli_mail, cli_pwd } = req.body;
  var { credentials, panier_items } = req.body;
  try {
    const client = await Client.findOne({ where: {cli_mail: credentials.cli_mail } });
    if (!client) {
      return res.render(view, {
        error: true,
        errorMsg: "paire login / mot de passe invalide",
      });
    }
    const valid = await bcrypt.compare(credentials.cli_pwd, client.cli_pwd);
    if (!valid) {
      // si le user est bon, on vérifie si il a 1 panier, si non on crée
      return res.render(view, {
        error: true,
        errorMsg: "paire login / mot de passe invalide",
      });
    }
    let oldPanier = await Panier.findOne({ where: { cli_id: client.cli_id } });
    if (!oldPanier) {
        var panier = await Panier.create({
          cli_id: client.cli_id,
        });
        if (panier_items && panier_items.length > 0) {
          await panier_items.forEach(async (item) => {
            // récuperation du produit avec les bonnes infos
            let produit = await Produit.findByPk(item.pro_id, {
              include: [
                {
                  model: Tarif,
                  attributes: ["tar_ttc", "tar_id", "tar_ht"],
                  where: {
                    [Op.and]: [
                      {
                        pro_id: item.pro_id,
                      },
                      {
                        tar_statut: ACTIF,
                      },
                    ],
                  },
                },
              ],
            });
            // insérer dans panier_details
            let panier_dtl = await Panier_detail.create({
              pro_id: produit.pro_id,
              tar_id: produit.Tarifs[0].tar_id,
              pan_id: panier.pan_id,
              pad_qte: item.pad_qte,
              pad_ht: produit.Tarifs[0].tar_ht,
            });
          });
        }
    }else{
      // panier existe déjà
    }
    req.session.panierId = panier.pan_id;
    req.session.userId = client.cli_id;
    res.locals.user = client;
    req.session.userId = client.cli_id;
    res.redirect(301, route);
  } catch (error) {
    return res.render(view, {
      error: true,
      errorMsg: "Quelque chose s'est mal passé pendant la reqûete",
    });
  }
}