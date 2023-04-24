const express = require('express');
const router = express.Router();
const ejs = require("ejs");
const path = require("path");
//app.set("layout", path.join(__dirname, "views/layout/layout"));
//app.set("views", path.join(__dirname, "views/admin"));
router.get('/',async (req,res)=>{
    let view = await ejs.renderFile(path.join(__dirname, "../../views/admin/login/index.ejs"))
    res.send(view);
});

module.exports = router;