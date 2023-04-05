"use strict";

var password = document.getElementById("password");
var btn = document.getElementById("btn-action");
var infoForm = document.querySelector('#info-form');
var adresseForm = document.querySelector('#adresse-form');
var livraisonForm = document.querySelector('#livraison-form');
var infoContent = document.querySelector('#info-content');
var adresseDiv = document.querySelector('#divAdress');
var livraisonDiv = document.querySelector('#divLivraison');
var finalisationDiv = document.querySelector('#divFinalisation');
var adresseContainer = document.querySelector('#adresse');
var livraisonContainer = document.querySelector('#livraison');
var finalisationContainer = document.querySelector('#finalisation');
var btnModiferInfo = document.querySelector('#info-mod-btn');
var btnModiferAdresse = document.querySelector('#adresse-mod-btn');
var btnModiferlivraison = document.querySelector('#livraison-mod-btn');
var btnModiferfinalisation = document.querySelector('#finalisation-mod-btn');
// const btnModiferInfo = document.querySelector('#info-mod-btn')
var faCheck = document.querySelector('#faCheck');
var eventAccordeonForm = function eventAccordeonForm(nextDiv, currentDiv, btnModifier, nexDiv) {
  nextDiv.style.display = "block";
  currentDiv.style.display = "none";
  btnModifier.style.display = "block";
  nexDiv.style.opacity = "1";
};
infoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  eventAccordeonForm(adresseDiv, infoContent, btnModiferInfo, adresseContainer);
});
btnModiferInfo.addEventListener("click", function (event) {
  event.preventDefault();
  adresseDiv.style.display = "none";
  infoContent.style.display = "flex";
  adresseTitle.style.pointerEvents = "none";
  adresseTitle.style.opacity = "0.6";
});
adresseForm.addEventListener("submit", function (event) {
  event.preventDefault();
  eventAccordeonForm(livraisonDiv, adresseDiv, btnModiferAdresse, livraisonContainer);
}); // pointer-events: none;

livraisonForm.addEventListener("submit", function (event) {
  event.preventDefault();
  eventAccordeonForm(finalisationDiv, livraisonDiv, btnModiferlivraison, finalisationContainer);
});
btn.addEventListener("click", function (e) {
  e.preventDefault();
  var type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  if (password.getAttribute("type") === "password") btn.textContent = "Montrer";else btn.textContent = "Cacher";
});
function toggle_visibility(id) {
  var element = document.getElementById(id);
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}