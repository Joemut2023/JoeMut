const {Client} = require('../models');

const setAuthorizedUser = async (req,res,next)=>{
    const UsersSession = req.session.userId;
    if (UsersSession) {
        let client = await Client.findByPk(UsersSession);
        res.locals.user = client;
    }
    next();
}
module.exports = setAuthorizedUser;