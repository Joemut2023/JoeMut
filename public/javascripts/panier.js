"use strict";

var btns_up = document.querySelectorAll(".btn-up");
var btns_down = document.querySelectorAll(".btn-down");
var link_parag = document.querySelector(".btnpromo");
var btn_promo = document.querySelector(".btn-promo");
var code_promo_block = document.querySelector(".promo_block");
var btn_fermer = document.querySelector(".fermer");
var panierDetails = document.querySelector(".comment");
var btnTrash = document.querySelectorAll(".btn-down");
console.log(btnTrash);
var storedITems = Kart.getParsedBasket();
var panierDetailsHtml = "";
storedITems.map(function (produit) {
  panierDetailsHtml += "\n  <div class=\"articles row\">\n    <div class=\"col-md-1 clo-sm-1 id\">".concat(produit.pro_ref, "</div>\n  <div class=\"col-md-3 col-sm-4 image\">\n    <img src=\"/images/produits/").concat(produit.media, "\" class=\"img-fluid\" alt=\"\" />\n  </div>\n  <div class=\"col-md-3 col-sm-7 description\">\n    <div class=\"desc\">\n      <a href=\"/article/").concat(produit.pro_id, "\"><span>").concat(produit.pro_libelle, "</span></a>\n    </div>\n    <p class=\"price\">").concat(produit.pad_ttc, " \u20AC</p>\n  </div>\n  <div class=\"col-md-5 col-sm-12 prices\">\n    <div class=\"row\">\n      <div class=\"col-md-6 col-sm-10 block-price\">\n        <div class=\"row compteur\">\n          <div class=\"col-md-6 col-sm-6 qty-btn\">\n            <input type=\"text\" class=\"number-value\" value=\"").concat(produit.pad_qte, "\" />\n            <div class=\"btns\">\n              <button class=\"btn-up\">\n                <span><i class=\"fa-solid fa-chevron-up\"></i></span>\n              </button>\n              <button class=\"btn-down\">\n                <span><i class=\"fa-solid fa-chevron-down\"></i></span>\n              </button>\n            </div>\n          </div>\n          <div class=\"col-md-6 col-sm-6 prx\">\n            <span>").concat(produit.pad_ttc, " \u20AC</span>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-6 col-sm-2 delete\">\n        <span><i class=\"fa-solid fa-trash\"></i></span>\n      </div>\n    </div>\n  </div>\n  </div>\n");
});
panierDetails.innerHTML = panierDetailsHtml;
btns_up.forEach(function (element) {
  element.addEventListener("click", function () {
    var compteur = element.parentNode.parentNode.children[0].value;
    compteur = isNaN(compteur) ? 1 : compteur;
    compteur++;
    element.parentNode.parentNode.children[0].value = compteur;
  });
});
btns_down.forEach(function (element) {
  element.addEventListener("click", function () {
    console.log("ds");
    var decrement = element.parentNode.parentNode.children[0].value;
    decrement = isNaN(decrement) ? 1 : decrement;
    if (decrement > 1) decrement--;
    element.parentNode.parentNode.children[0].value = decrement;
  });
});
link_parag.addEventListener("click", function () {
  link_parag.classList.add("linkhide");
  code_promo_block.classList.remove("hide-promo");
  code_promo_block.classList.add("code-promo");
});
btn_fermer.addEventListener("click", function () {
  link_parag.classList.remove("linkhide");
  code_promo_block.classList.remove("code-promo");
  code_promo_block.classList.add("hide-promo");
});