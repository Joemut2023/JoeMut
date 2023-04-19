const verifySession = (req, res, next) => {
  const UsersSession = req.session.userId;
  if (!UsersSession) {
    if (req.xhr) {
      return res.json('connexion')
    }
    res.redirect("/connexion/#page-connexion");
  }
  return next();
};

module.exports = verifySession