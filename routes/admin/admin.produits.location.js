const express = require("express");
const router = express.Router();
const {
  Detail_expedition,
  Retour,
  Produit,
  Commande,
  Media,
  Expedition,
  Client,
  Panier,
  Panier_detail
} = require("../../models");
const moment = require("moment");
const check_search_input = require("../../helpers/check_search_input");
const { Op } = require("sequelize");
const Logger = require("../../helpers/Logger");
const {
  check_value_date_start,
  check_value_date_last,
} = require("../../helpers/check_search_input_date");
const check_front_input = (value) => {
  return typeof value != "undefined" ? value : "";
};
router.get("/", async (req, res) => {
  
  try {

    let commandes = await Commande.findAll({
      attributes:['com_id','pan_id','com_num'],
      include:[
        {
          model:Panier,
          attributes:['pan_id','cli_id',],
          include:[
            {
              model:Panier_detail,
              attributes:['pad_id','pad_qte'],
              include:[
                {
                  model:Produit,
                  attributes:['pro_id','pro_libelle',"pro_ref"]
                }
              ]
            }
          ]
        },
        {
          model:Expedition,
          required:false,
          attributes:['exp_id','exp_depart']
        },
        {
          model:Client,
          attributes:['cli_id','cli_nom','cli_prenom']
        }]
    });
    res.render("produits.location/index", {
      commandes,
      moment,
      check_front_input,
    });
  } catch (error) {
    Logger.error(error.stack);
    res.render("produits.location/index", {
      error,
      check_front_input,
    });
  }
});
router.post("/search", async (req, res) => {
  const {pro_ref,com_num,cli_nom,cli_prenom,exp_date,exp_date_2} = req.body;
  try {

    let commandes = await Commande.findAll({
      attributes:['com_id','pan_id','com_num'],
      include:[
        {
          model:Panier,
          attributes:['pan_id','cli_id',],
          include:[
            {
              model:Panier_detail,
              attributes:['pad_id','pad_qte'],
              include:[
                {
                  model:Produit,
                  attributes:['pro_id','pro_libelle',"pro_ref"],
                  where: {
                    pro_ref: {
                      [Op.like]: check_search_input(pro_ref),
                    },
                  }
                }
              ]
            }
          ]
        },
        {
          model:Expedition,
          required:false,
          attributes:['exp_id','exp_depart'],
          exp_depart: {
            [Op.between]: [
              check_value_date_start(exp_date),
              check_value_date_last(exp_date_2),
            ],
          }
        },
        {
          model:Client,
          attributes:['cli_id','cli_nom','cli_prenom'],
          where: {
            [Op.or]: {
              cli_nom: {
                [Op.like]: check_search_input(cli_nom),
              },
              cli_prenom: {
                [Op.like]: check_search_input(cli_prenom),
              },
            },
          }
      }],
      where: {
        com_num: {
          [Op.like]: check_search_input(com_num),
        },
      }
    });
    res.render("produits.location/index", {
      commandes,
      moment,
      pro_ref,
      com_num,
      cli_nom,
      cli_prenom,
      exp_date,
      exp_date_2,
      check_front_input,
    });
  } catch (error) {
    Logger.error(+error.stack);
    res.render("produits.location/index", {
      error,
      check_front_input,
    });
  }
});

module.exports = router;
