const { Panier_detail } = require("../models");

const getPanierDetail = async (req, res, next) => {
  const pan_id = req.session.panierId;
  if (typeof pan_id !== "undefined") {
    const Produits = await Panier_detail.findAll({
      where: { pan_id },
    });
    res.locals.pan_nbr = Produits.length;
  } else {
    res.locals.pan_nbr = 0;
  }

  return next();
};
module.exports = getPanierDetail;
