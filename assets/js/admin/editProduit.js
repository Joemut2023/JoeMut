const button1 = document.querySelector(".btn-tab-1");
const button2 = document.querySelector(".btn-tab-2");
// const button3 = document.querySelector(".btn-tab-3");
// const button4 = document.querySelector(".btn-tab-4");

const lines = document.querySelector(".lines");
const btnAdd = document.querySelector(".btn-add-taille");

const btns_delete = document.querySelectorAll(".delete");
const pro_libelle = document.querySelector(".pro-libelle");
const pro_ref = document.querySelector(".pro-ref");
const pro_description = document.querySelector(".pro-description");
const pro_details = document.querySelector(".pro-details");
const collect = document.querySelector(".pro-new-collect");
const avant = document.querySelector(".pro-en-avant");
const statut = document.querySelector(".pro-statut");
const selectCategorie = document.querySelector(".select-categorie");
const categorieParent = document.querySelector(".accueil");
const listCat = document.querySelector(".cat-select");
const ht = document.querySelector(".tar-ht");
const ttc = document.querySelector(".tar-ttc");
const btnEnregistrer = document.querySelector(".update");
const qtyMax = document.querySelector(".qty-max");
const messageError = document.querySelector(".parent-message-danger");

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
const updateInput = document.querySelector(".update_image");
const inputImageCover = document.querySelector(".file-cover");
const outputCover = document.querySelector(".output");
let imagesArray = [];
let imagesArrayCover = [];

inputImageCover.addEventListener("change", () => {
  const files = inputImageCover.files;
  imagesArrayCover[0] = files[0];

  displayCoverImage();
  displayCoverImage();
});

function displayCoverImage() {
  let images = "";
  imagesArrayCover.forEach((image, index) => {
    images += `<div class="image">
                  <img src="${URL.createObjectURL(image)}" alt="image">
                  <span onclick="deleteCoverImage(${index})"><i class="fa-solid fa-xmark"></i></span>
                </div>`;
  });
  outputCover.style.display = "flex";
  outputCover.innerHTML = images;
}
function validateInput(input) {
  if (input !== "") return true;
  else return false;
}
function deleteCoverImage(index) {
  imagesArrayCover.splice(index, 1);
  displayCoverImage();

  if (imagesArray.length === 0) {
    outputCover.style.display = "none";
  }
}

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
}

function addTaille(taille) {
  const line = document.createElement("div");
  line.classList.add("quantity","row");

  line.innerHTML = `
     <div class="col-md-5 qty-left">
                      <div class="form-group">
                        <select
                          class="form-select select-taille"
                          aria-label="Default select example"
                        >
                      ${taille.data.map(
                        (item) =>
                          `<option value=${item.tai_id}>${item.tai_libelle}</option>`
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
                    <div class="col-md-2 delete delete-add">
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
  const btns_delete = document.querySelectorAll(".delete-add");
  Array.from(btns_delete, (item) => {
    item.addEventListener("click", async function () {
      lines.removeChild(this.parentNode);
      const Myproduct = await axios.get(
        `${SITE_URL}/admin/produits/one/${pro_ref.name}`,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
      let qty_id = item.previousElementSibling.children[1].children[0].name;

      const qty = await axios.delete(
        `${SITE_URL}/admin/produits/qty/${Myproduct.data.pro_id}/${qty_id}`,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
    });
  });
});

function listCategorie(categorie) {
  console.log(categorie);
  listCat.innerHTML = `
  ${categorie.data.map(
    (item) => `<option value=${item.cat_id}>${item.cat_libelle}</option>`
  )}
  `;
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

const btn_delete_image = document.querySelectorAll(".btn-delete-image");

Array.from(btn_delete_image, (item) => {
  item.addEventListener("click", async function () {
    const Myproduct = await await axios.get(
      `${SITE_URL}/admin/produits/one/${pro_ref.name}`,
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    const media = await axios.delete(
      `${SITE_URL}/admin/produits/media/${Myproduct.data.pro_id}/${item.id}`,
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
   
     window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    window.location.reload();
  });
});

const btn_close_error = document.querySelector(".close-error");
btn_close_error.addEventListener("click", function () {
  messageError.style.display = "none";
});
btnEnregistrer.addEventListener("click", async function () {
  const cat_id = listCat ? listCat.value : 1;
  const pro_new_collect = collect.checked ? true : false;
  const pro_en_avant = avant.checked ? true : false;
  const pro_statut = statut.checked ? true : false;
  const tar_ht = parseFloat(Number(ht.value.replace(",", ".")));
  const tar_ttc = parseFloat(Number(ttc.value.replace(",", ".")));
  const formWithImage = document.querySelector(".form-submit-image-edit");

  const Myproduct = await await axios.get(
    `${SITE_URL}/admin/produits/one/${pro_ref.name}`,
    {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    }
  );
  if (
    validateInput(pro_ref.value) &&
    validateInput(pro_libelle.value) &&
    validateInput(pro_details.value) &&
    validateInput(ht.value) &&
    validateInput(ttc.value)
  ) {
    messageError.style.display = "none";
    const data = {
      cat_id,
      pro_ref: pro_ref.value,
      pro_libelle: pro_libelle.value,
      pro_description: pro_description.value,
      // pro_details:pro_details.textContent,
      pro_new_collect,
      pro_en_avant,
      pro_statut,
    };

    const produit = await axios.put(
      `${SITE_URL}/admin/produits/${Myproduct.data.pro_id}`,
      data,
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    // console.log(produit)

    imagesArrayCover.map(async (image) => {
      const dataMedia = {
        med_libelle: image.name
          .replaceAll(/\s/g, "")
          .replaceAll(/\d/g, "")
          .replaceAll(/[~`!@#$%^&*()+={}\[\];:\'\"<>,\/\\\?_]/g, "")
          .split(".")[0],
        med_ressource: image.name
          .replaceAll(/\s/g, "")
          .replaceAll(/\d/g, "")
          .replaceAll(/[~`!@#$%^&*()+={}\[\];:\'\"<>,\/\\\?_]/g, ""),
      };
      const media = await axios.put(
        `${SITE_URL}/admin/produits/media/${Myproduct.data.pro_id}/${inputImageCover.id}`,
        dataMedia,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );

      //  console.log("cover", media);
    });

    let resultMedia = [];
    imagesArray.map(async (image) => {
      const dataMedia = {
        med_libelle: image.name
          .replaceAll(/\s/g, "")
          .replaceAll(/\d/g, "")
          .replaceAll(/[~`!@#$%^&*()+={}\[\];:\'\"<>,\/\\\?_]/g, "")
          .split(".")[0],
        med_ressource: image.name
          .replaceAll(/\s/g, "")
          .replaceAll(/\d/g, "")
          .replaceAll(/[~`!@#$%^&*()+={}\[\];:\'\"<>,\/\\\?_]/g, ""),
        med_cover: false,
      };
      const media = await axios.post(
        `${SITE_URL}/admin/produits/media/${Myproduct.data.pro_id}`,
        dataMedia,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
      if (media.data.med_ressource) {
        return resultMedia.push(media.data.msgMedia);
      }
    });

    const tarif = await axios.put(
      `${SITE_URL}/admin/produits/tarif/${Myproduct.data.pro_id}`,
      {
        tar_ht,
        tar_ttc,
      },
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );

    const selectTailles = document.querySelectorAll(".select-taille");
    const selectTailleExist = document.querySelectorAll(".select-taille-exist");
    let qty;
    Array.from(selectTailles, async (item) => {
      const dataselect = {
        tai_id: item.value,
        qua_nbre: parseInt(
          item.parentNode.parentNode.parentNode.children[1].children[1]
            .children[0].value
        ),
      };
      qty = await axios.post(
        `${SITE_URL}/admin/produits/qty/${Myproduct.data.pro_id}`,
        dataselect,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
      // console.log(qty);
    });

    Array.from(selectTailleExist, async (item) => {
      const dataselect = {
        tai_id: item.value,
        qua_nbre: parseInt(
          item.parentNode.parentNode.parentNode.children[1].children[1]
            .children[0].value
        ),
      };

      const qty = await axios.put(
        `${SITE_URL}/admin/produits/qty/${Myproduct.data.pro_id}`,
        dataselect,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
      // console.log(qty, "update");
    });

    // const message = document.querySelector(".parent-message");
   
    formWithImage.submit();
    window.location.reload();
  } else messageError.style.display = "flex";

  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});

//delete taille
Array.from(btns_delete, (item) => {
  item.addEventListener("click", async function () {
    lines.removeChild(this.parentNode);
    const Myproduct = await axios.get(
      `${SITE_URL}/admin/produits/one/${pro_ref.name}`,
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    let qty_id = item.previousElementSibling.children[1].children[0].name;

    const qty = await axios.delete(
      `${SITE_URL}/admin/produits/qty/${Myproduct.data.pro_id}/${qty_id}`,
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    window.location.reload();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
});
