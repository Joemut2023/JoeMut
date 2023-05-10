"use strict";

var button1 = document.querySelector(".btn-tab-1");
var button2 = document.querySelector(".btn-tab-2");
// const button3 = document.querySelector(".btn-tab-3");
// const button4 = document.querySelector(".btn-tab-4");

// const input_file = document.querySelector(".inputfile");

var lines = document.querySelector(".lines");
var btnAdd = document.querySelector(".btn-add-taille");
var btns_delete = document.querySelectorAll(".delete");
console.log("buttons ", btns_delete);
button1.addEventListener("click", function () {
  button1.classList.add("clicked");
  button2.classList.remove("clicked");
  // button3.classList.remove("clicked");
  // button4.classList.remove("clicked");
});

button2.addEventListener("click", function () {
  button1.classList.remove("clicked");
  button2.classList.add("clicked");
  // button3.classList.remove("clicked");
  // button4.classList.remove("clicked");
});

// button3.addEventListener("click", function () {
//   button1.classList.remove("clicked");
//   button3.classList.add("clicked");
//   button2.classList.remove("clicked");
//   button4.classList.remove("clicked");
// });

// button4.addEventListener("click", function () {
//   button1.classList.remove("clicked");
//   button4.classList.add("clicked");
//   button2.classList.remove("clicked");
//   button3.classList.remove("clicked");
// });

// traitement image
var inputDiv = document.querySelector(".images");
var inputImage = document.querySelector(".inputfile");
var output = document.querySelector(".image-container");
var imagesArray = [];
inputImage.addEventListener("change", function () {
  var files = inputImage.files;
  for (var i = 0; i < files.length; i++) {
    imagesArray.push(files[i]);
  }
  displayImages();
});
function displayImages() {
  var images = "";
  imagesArray.forEach(function (image, index) {
    images += "<div class=\"item\">\n                  <img src=\"".concat(URL.createObjectURL(image), "\" alt=\"image\">\n                  <span style=\"cursor:pointer;\" onclick=\"deleteImage(").concat(index, ")\"><i class=\"fa-solid fa-xmark\"></i></span>\n                </div>");
  });
  // output.style.display = "flex";
  output.innerHTML = images;
}
function deleteImage(index) {
  imagesArray.splice(index, 1);
  displayImages();

  // if (imagesArray.length === 0) {
  //   output.style.display = "none";
  // }
}

function addTaille() {
  console.log("FONCTIONNE");
  var line = document.createElement("div");
  line.classList.add("quantity", "row");
  line.innerHTML = "\n     <div class=\"col-md-5 qty-left\">\n                      <div class=\"form-group\">\n                        <select\n                          class=\"form-select\"\n                          aria-label=\"Default select example\"\n                        >\n                          <option selected>Taille</option>\n                          <option value=\"1\">One</option>\n                          <option value=\"2\">Two</option>\n                          <option value=\"3\">Three</option>\n                        </select>\n                      </div>\n                    </div>\n                    <div class=\"col-md-5 qty-right\">\n                      <div class=\"title-qty\"></div>\n                      <div class=\"form-group\">\n                        <input type=\"number\" value=\"0\" class=\"form-control\" />\n                      </div>\n                    </div>\n                    <div class=\"col-md-2 delete\">\n                      <span><i class=\"fa-solid fa-trash\"></i></span>\n                    </div>\n                  </div>\n  ";
  lines.appendChild(line);
}
btnAdd.addEventListener("click", function () {
  addTaille();
});