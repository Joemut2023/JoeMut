const input_choix = document.getElementById("input");
const choix = document.querySelector("#choix");
const content = document.getElementById("content");
const item_select = document.querySelectorAll(".item-choice");

input_choix.addEventListener("click", function () {
  content.classList.toggle("content-hide");
  content.classList.add("content");
});

