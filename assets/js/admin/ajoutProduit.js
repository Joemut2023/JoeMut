const button1 = document.querySelector(".btn-tab-1");
const button2 = document.querySelector(".btn-tab-2");
const button3 = document.querySelector(".btn-tab-3");
const button4 = document.querySelector(".btn-tab-4");

const input_file = document.querySelector(".inputfile");

const lines = document.querySelector(".lines");
const btnAdd = document.querySelector(".btn-add-taille");

const btns_delete = document.querySelectorAll(".delete");

const selectCategorie = document.querySelector(".select-categorie");
// const selectTypeCategorie = document.querySelector(".select-type-cat");
const categorieParent = document.querySelector(".accueil");

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
  output.style.display = "flex";
  output.innerHTML = images;
}

function deleteImage(index) {
  imagesArray.splice(index, 1);
  displayImages();

  if (imagesArray.length === 0) {
    output.style.display = "none";
  }
}

async function addTaille(taille) {
  const line = document.createElement("div");
  line.classList.add("quantity", "row");

  line.innerHTML = `
     <div class="col-md-5 qty-left">
                      <div class="form-group">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                      ${taille.data.map(
                        (item) =>
                          `<option value=${item.tai_libelle}>${item.tai_libelle}</option>`
                      )}
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

btnAdd.addEventListener("click", async function () {
  const taille = await axios.get(`${SITE_URL}/admin/produits/add/tailles`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  // console.log(taille);
  addTaille(taille);
});

function listCategorie(categorie) {
  const selectCat = document.createElement("select");

  selectCat.classList.add("form-select", "select-type-cat");
  selectCat.setAttribute("aria-label", "Default select example");

  selectCat.innerHTML = `
  ${categorie.data.map(
    (item) => `<option value=${item.cat_id}>${item.cat_libelle}</option>`
  )}
  `;

  while (categorieParent.firstChild) {
    categorieParent.removeChild(categorieParent.lastChild);
  }

  categorieParent.appendChild(selectCat);
  
  
}

selectCategorie.addEventListener("change", async function () {
  const categorie = await axios.get(
    `${SITE_URL}/admin/produits/categorie/${this.value}`,
    {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    }
  );

  listCategorie(categorie);
});
