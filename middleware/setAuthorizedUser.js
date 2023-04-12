const setAuthorizedUser = async (req,res,next)=>{
    const UsersSession = req.session.userId;
    if (UsersSession) {
        res.locals.user = UsersSession;
    }
    next();
}
module.exports = setAuthorizedUser;