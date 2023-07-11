const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const puppeteer = require("puppeteer");
const Logger = require("./Logger");
/**
 * Transforme une page html en pdf
 * @param {*} url page à transformer
 * @param {*} path dossier de stockage du pdf
 */ 
module.exports = async (url, pdfpath)=>{
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      page.isJavaScriptEnabled(false);
      try {
        await page.goto(url, {
          timeout: 60000,
        });
        await page.pdf({
          path: path.join(
            __dirname,
            pdfpath
          ),
        });
        await page.close();
      } catch (error) {
        Logger.error(error.stack)
      }
    } catch (error) {
      Logger.error(error.stack)
    }
}