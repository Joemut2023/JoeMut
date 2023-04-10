"use strict";

var navlink_one = document.querySelector(".btn-tab-one");
var navlink_two = document.querySelector(".btn-tab-two");
var input = document.querySelector(".number-value");
var btn_up = document.querySelector(".btn-up");
var btn_down = document.querySelector(".btn-down");
var image_grand = document.querySelector(".img-grand");
var image_small = document.querySelectorAll(".img-small");
navlink_one.addEventListener("click", function () {
  navlink_one.classList.add("button-add");
  navlink_two.classList.remove("button-add");
});
navlink_two.addEventListener("click", function () {
  navlink_two.classList.add("button-add");
  navlink_one.classList.remove("button-add");
});
btn_up.addEventListener("click", function () {
  var compteur = document.querySelector(".number-value").value;
  compteur = isNaN(compteur) ? 1 : compteur;
  compteur++;
  input.value = compteur;
});
btn_down.addEventListener("click", function () {
  var compteur = parseInt(document.querySelector(".number-value").value);
  compteur = isNaN(compteur) ? 1 : compteur;
  if (compteur > 1) compteur--;
  input.value = compteur;
});
image_small.forEach(function (element) {
  element.addEventListener("click", function () {
    image_grand.src = element.src;
  });
});
input.addEventListener("input", function () {
  input.value = input.value.replace(/[^0-9]/gi, "1");
});