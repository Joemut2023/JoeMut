"use strict";

var btn_plus_petit = document.getElementById("plus-petit");
var btn_minus_petit = document.getElementById("minus-petit");
var btn_plus_moyen = document.getElementById("plus-moyen");
var btn_minus_moyen = document.getElementById("minus-moyen");
var btn_plus_acc = document.getElementById("plus-acc");
var btn_minus_acc = document.getElementById("minus-acc");
var btn_plus_grand = document.getElementById("plus-grand");
var btn_minus_grand = document.getElementById("minus-grand");

btn_plus_petit.addEventListener("click", function () {
  btn_minus_petit.style.display = "block";
  btn_plus_petit.style.display = "none";
});
btn_minus_petit.addEventListener("click", function () {
  btn_minus_petit.style.display = "none";
  btn_plus_petit.style.display = "block";
});
btn_plus_moyen.addEventListener("click", function () {
  btn_minus_moyen.style.display = "block";
  btn_plus_moyen.style.display = "none";
});
btn_minus_moyen.addEventListener("click", function () {
  btn_minus_moyen.style.display = "none";
  btn_plus_moyen.style.display = "block";
});
btn_plus_acc.addEventListener("click", function () {
  btn_minus_acc.style.display = "block";
  btn_plus_acc.style.display = "none";
});
btn_minus_acc.addEventListener("click", function () {
  btn_minus_acc.style.display = "none";
  btn_plus_acc.style.display = "block";
});
btn_plus_grand.addEventListener("click", function () {
  btn_minus_grand.style.display = "block";
  btn_plus_grand.style.display = "none";
});
btn_minus_grand.addEventListener("click", function () {
  btn_minus_grand.style.display = "none";
  btn_plus_grand.style.display = "block";
});


var input_choix = document.getElementById("input");
var choix = document.querySelector("#choix");
var content = document.getElementById("content");
var item_select = document.querySelectorAll(".item-choice");
input_choix.addEventListener("click", function () {
  content.classList.toggle("content-hide");
  content.classList.add("content");
});
item_select.forEach(function (element) {
  element.addEventListener("click", function () {
    choix.textContent = element.textContent;
  });
});

