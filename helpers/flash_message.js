module.exports = (req,message)=>{
    req.session.flash = {
        message:message
    }
}