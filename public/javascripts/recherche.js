"use strict";

var input_choix = document.getElementById("input");
var choix = document.querySelector("#choix");
var content = document.getElementById("content");
var item_select = document.querySelectorAll(".item-choice");
input_choix.addEventListener("click", function () {
  content.classList.toggle("content-hide");
  content.classList.add("content");
});

// item_select.forEach((element) => {
//     element.addEventListener("click", function(){
//         choix.textContent = element.textContent
//     })
// });