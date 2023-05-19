const flashMidleware = (req,res,next)=>{
    let flashSession = req.session.flash;
    if (typeof flashSession !== 'undefined') {
        res.locals.flash = flashSession
    }
    next();
}
module.exports = flashMidleware;