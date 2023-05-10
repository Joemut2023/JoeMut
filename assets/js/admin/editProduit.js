const button1 = document.querySelector(".btn-tab-1");
const button2 = document.querySelector(".btn-tab-2");
// const button3 = document.querySelector(".btn-tab-3");
// const button4 = document.querySelector(".btn-tab-4");

// const input_file = document.querySelector(".inputfile");

const lines = document.querySelector(".lines");
const btnAdd = document.querySelector(".btn-add-taille");

const btns_delete = document.querySelectorAll(".delete");
const collect = document.querySelector(".pro-new-collect");
const avant = document.querySelector(".pro-en-avant");
const statut = document.querySelector(".pro-statut");

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
const inputDiv = document.querySelector(".images");
const inputImage = document.querySelector(".inputfile");
const output = document.querySelector(".image-container");
let imagesArray = [];

inputImage.addEventListener("change", () => {
  const files = inputImage.files;
  for (let i = 0; i < files.length; i++) {
    imagesArray.push(files[i]);
  }
  displayImages();
});

function displayImages() {
  let images = "";
  imagesArray.forEach((image, index) => {
    images += `<div class="item">
                  <img src="${URL.createObjectURL(image)}" alt="image">
                  <span style="cursor:pointer;" onclick="deleteImage(${index})"><i class="fa-solid fa-xmark"></i></span>
                </div>`;
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
  const line = document.createElement("div");
  line.classList.add("quantity", "row");

  line.innerHTML = `
     <div class="col-md-5 qty-left">
                      <div class="form-group">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>Taille</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-5 qty-right">
                      <div class="title-qty"></div>
                      <div class="form-group">
                        <input type="number" value="0" class="form-control" />
                      </div>
                    </div>
                    <div class="col-md-2 delete">
                      <span><i class="fa-solid fa-trash"></i></span>
                    </div>
                  </div>
  `;

  lines.appendChild(line);
}

btnAdd.addEventListener("click", function () {
  addTaille();
});
