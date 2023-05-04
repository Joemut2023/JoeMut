const button1 = document.querySelector(".btn-tab-1");
const button2 = document.querySelector(".btn-tab-2");
const button3 = document.querySelector(".btn-tab-3");
const button4 = document.querySelector(".btn-tab-4");

const input_file = document.querySelector(".inputfile");

const lines = document.querySelector(".lines");
const btn_add = document.querySelector(".btn-add-caracteristic");
const btns_delete = document.querySelectorAll(".delete");

console.log("buttons ", btns_delete);

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



// traitement image
const inputDiv = document.querySelector(".images");
const inputImage = document.querySelector(".file");
const output = document.querySelector("output");
let imagesArray = [];

inputImage.addEventListener("change", () => {
  const files = inputImage.files;
  for (let i = 0; i < files.length; i++) {
    imagesArray.push(files[i]);
  }
  displayImages();
});

inputImage.addEventListener("drop", (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    if (!files[i].type.match("image")) continue;

    if (imagesArray.every((imge) => imge.name !== files[i].name))
      imagesArray.push(files[i]);
  }
  displayImages();
});

function displayImages() {
  let images = "";
  imagesArray.forEach((image, index) => {
    images += `<div class="image">
                  <img src="${URL.createObjectURL(image)}" alt="image">
                  <span onclick="deleteImage(${index})"><i class="fa-solid fa-xmark"></i></span>
                </div>`;
  });
  output.style.display = "flex"
  output.innerHTML = images;
}

function deleteImage(index) {
  imagesArray.splice(index, 1);
  displayImages();

  if (imagesArray.length === 0){
    output.style.display = "none";
  }
}
