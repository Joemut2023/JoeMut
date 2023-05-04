"use strict";

var form = document.querySelector("form");
form.addEventListener("click", function () {
  btn_envoyer.setAttribute("data-bs-toggle", "modal");
  btn_envoyer.setAttribute("data-bs-target", "#sendModalLabel");
});