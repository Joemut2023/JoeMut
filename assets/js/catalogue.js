const btn_plus_petit = document.getElementById("plus-petit");
const btn_minus_petit = document.getElementById("minus-petit");
const btn_plus_moyen = document.getElementById("plus-moyen");
const btn_minus_moyen = document.getElementById("minus-moyen");
const btn_plus_acc = document.getElementById("plus-acc");
const btn_minus_acc = document.getElementById("minus-acc");
const btn_plus_grand = document.getElementById("plus-grand");
const btn_minus_grand = document.getElementById("minus-grand");

btn_plus_petit.addEventListener("click", function () {
  btn_minus_petit.style.display = "block";
  btn_plus_petit.style.display = "none";
});
btn_minus_petit.addEventListener("click", function () {
  btn_minus_petit.style.display = "none";
  btn_plus_petit.style.display = "block";
});

// btn_plus_moyen.addEventListener("click", function () {
//   btn_minus_moyen.style.display = "block";
//   btn_plus_moyen.style.display = "none";
// });
// btn_minus_moyen.addEventListener("click", function () {
//   btn_minus_moyen.style.display = "none";
//   btn_plus_moyen.style.display = "block";
// });

// btn_plus_acc.addEventListener("click", function () {
//   btn_minus_acc.style.display = "block";
//   btn_plus_acc.style.display = "none";
// });
// btn_minus_acc.addEventListener("click", function () {
//   btn_minus_acc.style.display = "none";
//   btn_plus_acc.style.display = "block";
// });
// btn_plus_grand.addEventListener("click", function () {
//   btn_minus_grand.style.display = "block";
//   btn_plus_grand.style.display = "none";
// });
// btn_minus_grand.addEventListener("click", function () {
//   btn_minus_grand.style.display = "none";
//   btn_plus_grand.style.display = "block";
// });



//SELECT
var input_choix = document.querySelector("#input")
var choix = document.querySelector("#choix");
var content = document.getElementById("content");
var item_select = document.querySelectorAll(".item-choice");

input_choix.addEventListener("click", function () {
  content.classList.toggle("content-hide");
  content.classList.add("content");
  // console.log(input_choix,"ok");
});

// item_select.forEach(function (element) {
//   element.addEventListener("click", function () {
//     choix.textContent = element.textContent;
//   });
// });
