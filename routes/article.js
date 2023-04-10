var express = require("express");
var router = express.Router();
const { Produit, Tarif, Media } = require("../models");

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
        },
      ],
    });
    // res.json({ article });
    const priceArticle = await Produit.findOne({
      include: [
        {
          model: Tarif,
          required: true,
          attributes: ["tar_ttc"],
        },
      ],
    });

    return res.render("article/index", {
      article: article,
      priceArticle: priceArticle,
    });
  } catch (error) {
    res.status(500).render("article/index", {
      error: true,
      errorMsg: "une erreur est survenue ",
    });
  }
});

module.exports = router;
