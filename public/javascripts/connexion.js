"use strict";

var password = document.getElementById("password");
var show = document.getElementById("btn-password");
var formElt = document.querySelector('#form');
show.addEventListener("click", function (e) {
  e.preventDefault();
  var type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  if (password.getAttribute("type") === "password") show.textContent = "Montrer";else show.textContent = "Cacher";
});

// formElt.addEventListener('submit',async (e)=>{
//   e.preventDefault();
//   await login_process('mon-compte');
// })