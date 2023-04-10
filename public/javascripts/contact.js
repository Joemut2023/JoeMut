"use strict";

var alert = document.querySelector(".mssg");
var btn_envoi = document.querySelector(".btn_envoi");
var form = document.getElementById("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  alert.style.display = "block";
});

// btn_envoi.addEventListener("click", () => {
//   alert.style.display = "block";
// });