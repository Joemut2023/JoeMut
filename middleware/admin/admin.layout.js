var path = require("path");

const adminLayout = (req,res,next)=>{
    req.app.set('views',path.join(__dirname, "../../views/admin"));
    req.app.set('layout',path.join(__dirname, "../../views/admin/layout/admin.layout.ejs"))
    return next();
}
module.exports = adminLayout;