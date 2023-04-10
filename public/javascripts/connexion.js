"use strict";

var password = document.getElementById("input-show");
var btn = document.getElementById("show-password");
btn.addEventListener("click", function (e) {
  e.preventDefault();
  var type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  if (password.getAttribute("type") === "password") btn.textContent = "Montrer";else btn.textContent = "Cacher";
});