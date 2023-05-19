const adminAuth = (req, res, next) => {
    const adminSession = req.session.adminId;
    if (!adminSession) {
      if (req.xhr) {
        return res.json('connexion')
      }
     return res.redirect("/admin/login");
    }
    return next();
  };
  
module.exports = adminAuth