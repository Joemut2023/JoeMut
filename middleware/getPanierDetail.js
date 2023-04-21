const { Panier_detail } = require("../models");

const getPanierDetail = async (req, res, next) => {
  const pan_id = req.session.panierId;
  if (typeof pan_id !== "undefined") {
    const quantite = await Panier_detail.sum("pad_qte",{
      where:{
        pan_id
      }
    });
    res.locals.pan_nbr = quantite;
  } else {
    res.locals.pan_nbr = 0;
  }

  return next();
};
module.exports = getPanierDetail;
