"use strict";

var btns_up = document.querySelectorAll(".btn-up");
var btns_down = document.querySelectorAll(".btn-down");
var input = document.querySelectorAll(".number-value");
console.log(btns_up);
btns_up.forEach(function (element) {
  element.addEventListener("click", function () {
    console.log("parent " + element.parentNode);
  });
});

// btn_up.addEventListener("click", function () {
//   let compteur = parseInt(document.querySelector(".number-value").value);
//   compteur = isNaN(compteur) ? 1 : compteur;
//   compteur++;
//   input.value = compteur;
// });

// btn_down.addEventListener("click", function () {
//   let compteur = parseInt(document.querySelector(".number-value").value);
//   compteur = isNaN(compteur) ? 1 : compteur;
//   if (compteur > 1) compteur--;
//   input.value = compteur;
// });