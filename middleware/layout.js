var path = require("path");

const Layout = (req,res,next)=>{
    req.app.set('views',path.join(__dirname, "../views"));
    req.app.set('layout',path.join(__dirname, "../views/layout/layout.ejs"));
    req.app.set("layout extractStyles", true);
    req.app.set("layout extractScripts", true);
    return next();
}
module.exports = Layout;