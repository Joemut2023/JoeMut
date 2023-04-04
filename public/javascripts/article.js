"use strict";

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }
var navlink_one = document.querySelector(".btn-tab-one");
var navlink_two = document.querySelector(".btn-tab-two");
var btn_up = document.querySelector(".btn-up");
var btn_down = document.querySelector(".btn-down");
var number = parseInt(document.querySelector(".number-value").value);
var input = document.querySelector(".number-value");
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

// Incrementation
btn_up.addEventListener("click", function () {
  parseInt(isNaN(number)) ? 1 : parseInt(number), _readOnlyError("number");
  +number, _readOnlyError("number");
  input.value = number;
});

// Images
image_small.forEach(function (element) {
  element.addEventListener("click", function () {
    // alert("click yes !")
    image_grand.src = element.src;
  });
});