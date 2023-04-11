var express = require("express");
var router = express.Router();
const { Produit, Tarif, Media } = require("../models");
const { Op } = require("sequelize");

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const article = await Produit.findOne({
      where: {
        pro_id: id,
      },
      include: [
        {
          model: Media,
          required: true,
          where:{
            pro_id:id
          }
        },
      ],
    });

    const ref_produit = article.pro_ref
    const ref_produit_caractere = ref_produit.slice(0,ref_produit.length-1)

    const produits_similaires = await Produit.findAll({
      limit: 3,
      include: [
        { model: Media, attributes: ["med_id", "med_ressource"] },
        { model: Tarif, attributes: ["tar_ttc"] },
      ],
      where: {
        [Op.and]: [
          {
            pro_ref: {
              [Op.like]: `${ref_produit_caractere}%`,
            },
          },
          {
            pro_ref: {
              [Op.not]: ref_produit,
            },
          },
        ],
      },
    });
    // res.json({ produits_similaires });
    const priceArticle = await Produit.findOne({
      include: [
        {
          model: Tarif,
          required: true,
          where: {
            pro_id: id,
          },
          attributes: ["tar_ttc"],
        },
      ],
    });

    return res.render("article/index", {
      article: article,
      priceArticle: priceArticle,
      produits_similaires: produits_similaires,
    });
  } catch (error) {
    res.status(500).render("article/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});
/* router.get('/:id',async (req,res)=>{
  
}) */
module.exports = router;
