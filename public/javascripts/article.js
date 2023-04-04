"use strict";

var navlink_one = document.querySelector(".btn-tab-one");
var navlink_two = document.querySelector(".btn-tab-two");
navlink_one.addEventListener("click", function () {
  navlink_one.classList.add("button-add");
  navlink_two.classList.remove("button-add");
});
navlink_two.addEventListener("click", function () {
  navlink_two.classList.add("button-add");
  navlink_one.classList.remove("button-add");
});