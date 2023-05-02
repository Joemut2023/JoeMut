"use strict";

var button1 = document.querySelector(".btn-tab-1");
var button2 = document.querySelector(".btn-tab-2");
var button3 = document.querySelector(".btn-tab-3");
var button4 = document.querySelector(".btn-tab-4");
var input_file = document.querySelector(".inputfile");
var lines = document.querySelector(".lines");
var btn_add = document.querySelector(".btn-add-caracteristic");
console.log("buttons ", btns_delete);

// console.log("mon pere ", deleteParent);
button1.addEventListener("click", function () {
  button1.classList.add("clicked");
  button2.classList.remove("clicked");
  button3.classList.remove("clicked");
  button4.classList.remove("clicked");
});
button2.addEventListener("click", function () {
  button1.classList.remove("clicked");
  button2.classList.add("clicked");
  button3.classList.remove("clicked");
  button4.classList.remove("clicked");
});
button3.addEventListener("click", function () {
  button1.classList.remove("clicked");
  button3.classList.add("clicked");
  button2.classList.remove("clicked");
  button4.classList.remove("clicked");
});
button4.addEventListener("click", function () {
  button1.classList.remove("clicked");
  button4.classList.add("clicked");
  button2.classList.remove("clicked");
  button3.classList.remove("clicked");
});
function appendLine() {
  var line = document.createElement("div");
  line.classList.add("row");
  line.classList.add("line");
  line.innerHTML = "\n  <div class=\"col-md-4\">\n                    <select\n                      class=\"form-select\"\n                      aria-label=\"Default select example\"\n                    >\n                      <option selected>Choisissez une caracteristique</option>\n                      <option value=\"1\">One</option>\n                      <option value=\"2\">Two</option>\n                      <option value=\"3\">Three</option>\n                    </select>\n                  </div>\n                  <div class=\"col-md-4\">\n                    <div class=\"form-group has-feedback has-feedback-left\">\n                      <input\n                        type=\"number\"\n                        class=\"form-control\"\n                        placeholder=\"Choisissez une valeur\"\n                      />\n                    </div>\n                  </div>\n                  <div class=\"col-md-4 person\">\n                    <div class=\"form-group\">\n                      <input type=\"text\" class=\"form-control\" />\n                      <span class=\"delete delete-add col-md-1\">\n                        <i class=\"fa-solid fa-trash\"></i>\n                      </span>\n                    </div>\n                  </div>\n                </div>\n  ";
  lines.appendChild(line);
}
btn_add.addEventListener("click", function () {
  appendLine();
  var btns_delete = document.querySelectorAll(".delete");
  console.log("mon button", btns_delete);
});
btns_delete.forEach(function (element) {
  element.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("BONJOUR ");
  });
});