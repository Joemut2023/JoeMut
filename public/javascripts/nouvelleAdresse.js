"use strict";

var particulier = document.querySelector("#checkboxParticulier");
var entreprise = document.querySelector("#checkboxEntreprise");
var entrepriseInput = document.querySelectorAll(".entrepriseChoice1");
particulier.addEventListener('click', function (e) {
  console.log(e.target.checked);
  // if (entreprise.checked) {
  for (var i = 0; i < entrepriseInput.length; i += 1) {
    console.log(entrepriseInput[i]);
    entrepriseInput[i].classList.add("entrepriseChoice");
  }
  //} 
});

entreprise.addEventListener('click', function (e) {
  console.log(e.target.checked, "entreprise");
  // if (entreprise.checked) {
  for (var i = 0; i < entrepriseInput.length; i += 1) {
    console.log(entrepriseInput[i]);
    entrepriseInput[i].classList.remove("entrepriseChoice");
  }
  //} 
});

//   else {
//     for (let i = 0; i < entrepriseInput.length; i += 1) {
//       entrepriseInput[i].style.display = "flex";
//     }
//   }