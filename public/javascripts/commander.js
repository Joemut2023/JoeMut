"use strict";

//change for big title on bloc-form
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
var checkSuccess = document.querySelector('.check-success');
var checkAdresse = document.querySelector('.check-adresse');
var checkLivraison = document.querySelector('.check-livraison');
var cursorAdresse = document.querySelector('.adresse-cursor');
var cursorfinalisation = document.querySelector('.finalisation-cursor');
var cursorLivraison = document.querySelector('.livraison-cursor');
var borderNumber = document.querySelector('.border-number');
var adresseBg = document.querySelector('.adresse-bg');
var livraisonBg = document.querySelector('.livraison-bg');
var finalisationBg = document.querySelector('.finalisation-bg');

//for class tabs
var navlink_one = document.querySelector(".btn-tab-one");
var navlink_two = document.querySelector(".btn-tab-two");
var password = document.getElementById("password");
var btn = document.getElementById("btn-action");
var eventAccordeonForm = function eventAccordeonForm(nextDiv, currentDiv, btnModifier, nexDiv, changeBorder, iconSuccess, eventCursor, classAdresse) {
  nextDiv.style.display = "block";
  currentDiv.style.display = "none";
  btnModifier.style.display = "block";
  nexDiv.style.opacity = "1";
  changeBorder.style.color = "grey";
  changeBorder.style.backgroundColor = "white";
  changeBorder.style.border = "1px solid grey";
  iconSuccess.style.display = "block";
  eventCursor.style.cursor = "default";
  classAdresse.style.backgroundColor = "#61ce70";
  classAdresse.style.color = "white";
  classAdresse.style.border = "1px solid #61ce70";
};

// change events on infoForm
infoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  eventAccordeonForm(adresseDiv, infoContent, btnModiferInfo, adresseContainer, borderNumber, checkSuccess, cursorAdresse, adresseBg);
});
btnModiferInfo.addEventListener("click", function (event) {
  event.preventDefault();
  adresseDiv.style.display = "none";
  infoContent.style.display = "flex";
  borderNumber.style.color = "white";
  borderNumber.style.backgroundColor = "#61ce70";
  borderNumber.style.border = "1px solid #61ce70";
  checkSuccess.style.display = "none";
  adresseBg.style.color = "grey";
  adresseBg.style.backgroundColor = "white";
  adresseBg.style.border = "1px solid grey";
});

//change events on adresseForm
adresseForm.addEventListener("submit", function (event) {
  event.preventDefault();
  eventAccordeonForm(livraisonDiv, adresseDiv, btnModiferAdresse, livraisonContainer, adresseBg, checkAdresse, cursorLivraison, livraisonBg);
});
btnModiferAdresse.addEventListener("click", function (event) {
  event.preventDefault();
  livraisonDiv.style.display = "none";
  adresseDiv.style.display = "block";
  adresseBg.style.color = "white";
  adresseBg.style.backgroundColor = "#61ce70";
  adresseBg.style.border = "1px solid #61ce70";
  checkAdresse.style.display = "none";
  livraisonBg.style.color = "grey";
  livraisonBg.style.backgroundColor = "white";
  livraisonBg.style.border = "1px solid grey";
});

//change events on livraisonForm
livraisonForm.addEventListener("submit", function (event) {
  event.preventDefault();
  eventAccordeonForm(finalisationDiv, livraisonDiv, btnModiferlivraison, finalisationContainer, livraisonBg, checkLivraison, cursorfinalisation, finalisationBg);
});
btnModiferlivraison.addEventListener("click", function (event) {
  event.preventDefault();
  finalisationDiv.style.display = "none";
  livraisonDiv.style.display = "block";
  livraisonBg.style.color = "white";
  livraisonBg.style.backgroundColor = "#61ce70";
  livraisonBg.style.border = "1px solid #61ce70";
  checkLivraison.style.display = "none";
  finalisationBg.style.color = "grey";
  finalisationBg.style.backgroundColor = "white";
  finalisationBg.style.border = "1px solid grey";
});

//event hide/show password on form
btn.addEventListener("click", function (e) {
  e.preventDefault();
  var type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  if (password.getAttribute("type") === "password") btn.textContent = "Montrer";else btn.textContent = "Cacher";
});

//tabs
navlink_one.addEventListener("click", function () {
  navlink_one.classList.add("button-add");
  navlink_two.classList.remove("button-add");
});
navlink_two.addEventListener("click", function () {
  navlink_two.classList.add("button-add");
  navlink_one.classList.remove("button-add");
});
function toggle_visibility(id) {
  var element = document.getElementById(id);
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}