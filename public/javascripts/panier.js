"use strict";

var btns_up = document.querySelectorAll(".btn-up");
var btns_down = document.querySelectorAll(".btn-down");
var link_parag = document.querySelector(".btnpromo");
var btn_promo = document.querySelector(".btn-promo");
var code_promo_block = document.querySelector(".promo_block");
var btn_fermer = document.querySelector(".fermer");
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
    var compteur = element.parentNode.parentNode.children[0].value;
    compteur = isNaN(compteur) ? 1 : compteur;
    if (compteur > 1) compteur--;
    input.value = compteur;
    element.parentNode.parentNode.children[0].value = compteur;
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