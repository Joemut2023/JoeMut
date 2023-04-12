"use strict";

var link_parag = document.querySelector(".btnpromo");
var btn_promo = document.querySelector(".btn-promo");
var code_promo_block = document.querySelector(".promo_block");
var btn_fermer = document.querySelector(".fermer");
var panierDetails = document.querySelector(".comment");
var PanierPrice = document.querySelector(".panier-price");
var emptyKartText = document.querySelector("#empty-product-kart");
var storedITems = Kart.getParsedBasket();
var ProductQuantity = 0;
var TotalePrice = 0;
var RenderKartProduct = function RenderKartProduct() {
  var panierDetailsHtml = "";
  storedITems = Kart.getParsedBasket();
  storedITems.map(function (produit) {
    ProductQuantity = ProductQuantity + produit.pad_qte;
    panierDetailsHtml += "\n  <div class=\"articles row\">\n    <div class=\"col-md-1 clo-sm-1 id\">".concat(produit.pro_ref, "</div>\n  <div class=\"col-md-3 col-sm-4 image\">\n    <img src=\"/images/produits/").concat(produit.media, "\" class=\"img-fluid\" alt=\"\" />\n  </div>\n  <div class=\"col-md-3 col-sm-7 description\">\n    <div class=\"desc\">\n      <a href=\"/article/").concat(produit.pro_id, "\"><span>").concat(produit.pro_libelle, "</span></a>\n    </div>\n    <p class=\"price\">").concat(produit.pad_ttc, " \u20AC</p>\n  </div>\n  <div class=\"col-md-5 col-sm-12 prices\">\n    <div class=\"row\">\n      <div class=\"col-md-6 col-sm-10 block-price\">\n        <div class=\"row compteur\">\n          <div class=\"col-md-6 col-sm-6 qty-btn\">\n            <input type=\"text\" class=\"number-value\" value=\"").concat(produit.pad_qte, "\" />\n            <div class=\"btns\">\n              <button data-id=\"").concat(produit.pro_id, "\" class=\"btn-up\">\n                <span><i class=\"fa-solid fa-chevron-up\"></i></span>\n              </button>\n              <button data-id=\"").concat(produit.pro_id, "\" class=\"btn-down\">\n                <span><i class=\"fa-solid fa-chevron-down\"></i></span>\n              </button>\n            </div>\n          </div>\n          <div class=\"col-md-6 col-sm-6 prx\">\n            <span>").concat(produit.pad_ttc, " \u20AC</span>\n          </div>\n        </div>\n      </div>\n      <div data-id=\"").concat(produit.pro_id, "\" class=\"col-md-6 col-sm-2 delete\">\n        <span><i  class=\"fa-solid fa-trash\" ></i></span>\n      </div>\n    </div>\n  </div>\n  </div>\n");
  });
  panierDetails.innerHTML = panierDetailsHtml;
};
RenderKartProduct();
storedITems.length == 0 ? emptyKartText.style.display = "block" : null;
var btns_up = document.querySelectorAll(".btn-up");
var btns_down = document.querySelectorAll(".btn-down");
var btnTrash = document.querySelectorAll(".delete");
var eventlistner = function eventlistner(callback) {
  var btnTrash = document.querySelectorAll(".delete");
  btnTrash.forEach(function (element) {
    element.addEventListener("click", function () {
      var itemId = element.dataset.id;
      Kart.removeItem(itemId);
      callback();
      storedITems.length == 0 ? emptyKartText.style.display = "block" : null;
    });
  });
};
btnTrash.forEach(function (element) {
  element.addEventListener("click", function () {
    var itemId = element.dataset.id;
    Kart.removeItem(itemId);
    RenderKartProduct();
    eventlistner(function () {
      RenderKartProduct();
    });
  });
});
var TotalPricesProducts = function TotalPricesProducts() {
  var PanierPriceHtml = " \n  <div class=\"frais\">\n    <div class=\"item\">\n      <span class=\"title\">".concat(ProductQuantity, " articles</span>\n      <span class=\"price\">18,0 \u20AC</span>\n    </div>\n    <div class=\"item\">\n      <span class=\"title\">Livraisons</span>\n      <span class=\"price\">3,00 \u20AC</span>\n    </div>\n    <div class=\"item\">\n      <span class=\"title\">Frais de dossier</span>\n      <span class=\"price\">15,00 \u20AC</span>\n    </div>\n  </div>");
  PanierPrice.innerHTML = PanierPriceHtml;
};
TotalPricesProducts();
btns_up.forEach(function (element) {
  element.addEventListener("click", function () {
    var itemId = element.dataset.id;
    var compteur = element.parentNode.parentNode.children[0].value;
    compteur = isNaN(compteur) ? 1 : compteur;
    compteur++;
    element.parentNode.parentNode.children[0].value = compteur;
    ProductQuantity = ProductQuantity + 1;
    Kart.updateItemQuantity(itemId);
    TotalPricesProducts();
  });
});
btns_down.forEach(function (element) {
  element.addEventListener("click", function () {
    var decrement = element.parentNode.parentNode.children[0].value;
    decrement = isNaN(decrement) ? 1 : decrement;
    if (decrement > 1) decrement--;
    element.parentNode.parentNode.children[0].value = decrement;
    ProductQuantity = isNaN(ProductQuantity) ? 1 : ProductQuantity;
    if (ProductQuantity > 1) ProductQuantity--;
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
console.log(ProductQuantity);