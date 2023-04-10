"use strict";

var password = document.getElementById("password");
var show = document.getElementById("btn-password");
show.addEventListener("click", function (e) {
  e.preventDefault();
  var type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  if (password.getAttribute("type") === "password") btn.textContent = "Montrer";else btn.textContent = "Cacher";
});