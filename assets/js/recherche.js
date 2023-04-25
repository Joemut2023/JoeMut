const input_choix = document.getElementById("input");
const choix = document.querySelector("#choix");
const content = document.getElementById("content");
const item_select = document.querySelectorAll(".item-choice");

input_choix.addEventListener("click", function () {
  content.classList.toggle("content-hide");
  content.classList.add("content");
});

// item_select.forEach((element) => {
//     element.addEventListener("click", function(){
//         choix.textContent = element.textContent
//     })
// });
