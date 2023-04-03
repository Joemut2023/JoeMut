"use strict";

var myModal = document.getElementById("myModal");
var close = document.getElementById("close");
var btn_add = document.querySelectorAll(".button-ajouter");
close.addEventListener("click", function () {
  myModal.style.display = "none";
});
btn_add.forEach(function (element) {
  element.addEventListener("click", function () {
    myModal.style.display = "flex";
  });
});