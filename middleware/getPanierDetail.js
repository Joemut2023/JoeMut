const { Panier_detail } = require("../models");

const getPanierDetail = async (req, res, next) => {
  const pan_id = req.session.panierId;
  //const pan_id = 1;
   if (typeof pan_id !== 'undefined') {
        const Produits = await Panier_detail.findAll({
          where: { pan_id },
        });
        res.locals.pan_nbr = Produits.length
   }else{
    res.locals.pan_nbr = 0
   }
    console.log("========================");
    console.log(res.locals.pan_nbr);
    console.log("========================");
    return next()
};
module.exports = getPanierDetail;