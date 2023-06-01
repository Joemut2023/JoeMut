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
    let detail_expeditions = await Detail_expedition.findAll({
      include: [
        {
          model: Retour,
        },
        {
          model: Produit,
          attributes: ["pro_libelle", "pro_ref"],
          include: [
            {
              model: Media,
            },
          ],
        },
        {
          model: Expedition,
          attributes: ["com_id", "exp_depart"],
          include: [
            {
              model: Commande,
              attributes: ["com_num", "com_fin_spectacle"],
              include: [
                {
                  model: Client,
                  attributes: ["cli_nom", "cli_prenom"],
                },
              ],
            },
          ],
        },
      ],
    });
    res.render("produits.location/index", {
      detail_expeditions,
      moment,
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
router.post("/search", async (req, res) => {
  const { pro_ref, com_num, cli_nom, cli_prenom, exp_date, exp_date_2 } =
    req.body;
  try {
    let detail_expeditions = await Detail_expedition.findAll({
      include: [
        {
          model: Retour,
        },
        {
          model: Produit,
          attributes: ["pro_libelle", "pro_ref"],
          include: [
            {
              model: Media,
            },
          ],
          where: {
            pro_ref: {
              [Op.like]: check_search_input(pro_ref),
            },
          },
        },
        {
          model: Expedition,
          attributes: ["com_id", "exp_depart"],
          include: [
            {
              model: Commande,
              attributes: ["com_num", "com_fin_spectacle"],
              include: [
                {
                  model: Client,
                  attributes: ["cli_nom", "cli_prenom"],
                  where: {
                    [Op.or]: {
                      cli_nom: {
                        [Op.like]: check_search_input(cli_nom),
                      },
                      cli_prenom: {
                        [Op.like]: check_search_input(cli_prenom),
                      },
                    },
                  },
                },
              ],
              where: {
                com_num: {
                  [Op.like]: check_search_input(com_num),
                },
              },
            },
          ],
          where: {
            exp_depart: {
              [Op.between]: [
                check_value_date_start(exp_date),
                check_value_date_last(exp_date_2),
              ],
            },
          },
        },
      ],
    });
    res.render("produits.location/index", {
      detail_expeditions,
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
