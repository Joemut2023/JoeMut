const verifySession = (req, res, next) => {
  const UsersSession = req.session.userId;
  if (!UsersSession) {
    res.redirect("connexion/index");
  }
  return next();
};

module.exports = verifySession