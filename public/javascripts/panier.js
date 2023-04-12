"use strict";

var panierDetails = document.querySelector(".comment");
var PanierPrice = document.querySelector(".panier-price");
var emptyKartText = document.querySelector("#empty-product-kart");
var storedITems = Kart.getParsedBasket();
var TotalePrice = 0;
var RenderKartProduct = function RenderKartProduct() {
  var panierDetailsHtml = "";
  storedITems = Kart.getParsedBasket();
  storedITems.map(function (produit) {
    panierDetailsHtml += "\n  <div class=\"articles row\">\n    <div class=\"col-md-1 clo-sm-1 id\">".concat(produit.pro_ref, "</div>\n  <div class=\"col-md-3 col-sm-4 image\">\n    <img src=\"/images/produits/").concat(produit.media, "\" class=\"img-fluid\" alt=\"\" />\n  </div>\n  <div class=\"col-md-3 col-sm-7 description\">\n    <div class=\"desc\">\n      <a href=\"/article/").concat(produit.pro_id, "\"><span>").concat(produit.pro_libelle, "</span></a>\n    </div>\n    <p class=\"price\">").concat(produit.pad_ttc, " \u20AC</p>\n  </div>\n  <div class=\"col-md-5 col-sm-12 prices\">\n    <div class=\"row\">\n      <div class=\"col-md-6 col-sm-10 block-price\">\n        <div class=\"row compteur\">\n          <div class=\"col-md-6 col-sm-6 qty-btn\">\n            <input type=\"text\" class=\"number-value\" value=\"").concat(produit.pad_qte, "\" />\n            <div class=\"btns\">\n              <button data-id=\"").concat(produit.pro_id, "\" class=\"btn-up\">\n                <span><i class=\"fa-solid fa-chevron-up\"></i></span>\n              </button>\n              <button data-id=\"").concat(produit.pro_id, "\" class=\"btn-down\">\n                <span><i class=\"fa-solid fa-chevron-down\"></i></span>\n              </button>\n            </div>\n          </div>\n          <div class=\"col-md-6 col-sm-6 prx\">\n            <span>").concat(produit.pad_ttc, " \u20AC</span>\n          </div>\n        </div>\n      </div>\n      <div data-id=\"").concat(produit.pro_id, "\" class=\"col-md-6 col-sm-2 delete\">\n        <span><i  class=\"fa-solid fa-trash\" ></i></span>\n      </div>\n    </div>\n  </div>\n  </div>\n");
  });
  panierDetails.innerHTML = panierDetailsHtml;
};
RenderKartProduct();
var btns_up = document.querySelectorAll(".btn-up");
var btns_down = document.querySelectorAll(".btn-down");
var btnTrash = document.querySelectorAll(".delete");
var TotalPricesProducts = function TotalPricesProducts() {
  var storedITems = Kart.getParsedBasket();
  var storedFrais = Kart.getParsedFrais();
  var totalPriceht = 0;
  var totalPoductPrice = 0;
  var totalQuantity = 0;
  storedITems.forEach(function (element) {
    totalQuantity += element.pad_qte;
    totalPriceht += element.pad_qte * element.pad_ttc;
  });
  totalPoductPrice = totalPriceht + parseFloat(storedFrais.frais_port) + parseFloat(storedFrais.frais_dossier);
  var PanierPriceHtml = " \n  <div class=\"frais\">\n    <div class=\"item\">\n      <span class=\"title\">".concat(totalQuantity, " articles</span>\n      <span class=\"price\">").concat(totalPriceht.toFixed(2), "  \u20AC</span>\n    </div>\n    <div class=\"item\">\n      <span class=\"title\">Livraisons</span>\n      <span class=\"price\">").concat(storedFrais.frais_port, " \u20AC</span>\n    </div>\n    <div class=\"item\">\n      <span class=\"title\">Frais de dossier</span>\n      <span class=\"price\">").concat(storedFrais.frais_dossier, " \u20AC</span>\n    </div>\n    <hr>\n  </div>\n  <div class=\"item total\">\n  <span>TTC</span>\n  <span>").concat(totalPoductPrice.toFixed(2), " \u20AC</span>\n</div>\n<div class=\"promo\">\n  <div class=\"link\">\n    <p class=\"btnpromo\"><span>Vous avez un code promo ?</span></p>\n  </div>\n  <div class=\"hide-promo promo_block\">\n    <div class=\"btn-promo\">\n      <input type=\"text\" placeholder=\"Code promo\" />\n      <button>Ajouter</button>\n    </div>\n    <p class=\"fermer\">Fermer</p>\n  </div>\n</div>\n<a href=\"/commander/#page-commander\" class=\"button\">\n  <button class=\"enable\">Finaliser le Devis</button>\n</a>\n  ");
  PanierPrice.innerHTML = PanierPriceHtml;
};
TotalPricesProducts();
var link_parag = document.querySelector(".btnpromo");
var btn_promo = document.querySelector(".btn-promo");
var code_promo_block = document.querySelector(".promo_block");
var btn_fermer = document.querySelector(".fermer");
var btnFinaliser = document.querySelector(".enable");
if (storedITems.length == 0) {
  emptyKartText.style.display = "block";
  btnFinaliser.disabled = true;
  btnFinaliser.classList.add("btn-enabled");
}
var eventlistner = function eventlistner(callback) {
  var btnTrash = document.querySelectorAll(".delete");
  btnTrash.forEach(function (element) {
    element.addEventListener("click", function () {
      var itemId = element.dataset.id;
      Kart.removeItem(itemId);
      TotalPricesProducts();
      document.querySelector("#cart-item-count").innerHTML = Kart.getItemNumber();
      callback();
      if (storedITems.length == 0) {
        emptyKartText.style.display = "block";
        btnFinaliser.disabled = true;
        btnFinaliser.classList.add("btn-enabled");
      }
    });
  });
};
btnTrash.forEach(function (element) {
  element.addEventListener("click", function () {
    TotalPricesProducts;
    var itemId = element.dataset.id;
    Kart.removeItem(itemId);
    TotalPricesProducts();
    document.querySelector("#cart-item-count").innerHTML = Kart.getItemNumber();
    RenderKartProduct();
    eventlistner(function () {
      RenderKartProduct();
    });
  });
});
btns_up.forEach(function (element) {
  element.addEventListener("click", function () {
    var itemId = element.dataset.id;
    var compteur = element.parentNode.parentNode.children[0].value;
    compteur = isNaN(compteur) ? 1 : compteur;
    compteur++;
    element.parentNode.parentNode.children[0].value = compteur;
    Kart.updateItemQuantity(itemId, true);
    TotalPricesProducts();
    document.querySelector("#cart-item-count").innerHTML = Kart.getItemNumber();
  });
});
btns_down.forEach(function (element) {
  element.addEventListener("click", function () {
    var itemId = element.dataset.id;
    var decrement = element.parentNode.parentNode.children[0].value;
    decrement = isNaN(decrement) ? 1 : decrement;
    if (decrement > 1) {
      decrement--;
      Kart.updateItemQuantity(itemId, false);
      TotalPricesProducts();
      document.querySelector("#cart-item-count").innerHTML = Kart.getItemNumber();
    }
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