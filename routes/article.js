var express = require("express");
var router = express.Router();
const { Produit, Tarif } = require("../models");

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const article = await Produit.findOne({
      where: {
        pro_id: id,
      },
    });

    const priceArticle = await Produit.findOne({
      include: [
        {
          model: Tarif,
          required: true,
          attributes: ["tar_ttc"],
        },
      ],
    });
    // res.json({ priceArticle });
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