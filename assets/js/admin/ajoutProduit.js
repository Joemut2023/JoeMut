const button1 = document.querySelector(".btn-tab-1");
const button2 = document.querySelector(".btn-tab-2");
const button3 = document.querySelector(".btn-tab-3");
const button4 = document.querySelector(".btn-tab-4");
const btnEnregistrer = document.querySelector(".enregistrer");

const input_file = document.querySelector(".inputfile");
const pro_libelle = document.querySelector(".pro-libelle");
const pro_ref = document.querySelector(".pro-ref");
const pro_description = document.querySelector(".pro-description");
const pro_details = document.querySelector(".pro-details");
const pro_comment = document.querySelector(".pro-comment");
const collect = document.querySelector(".pro-new-collect");
const avant = document.querySelector(".pro-en-avant");
const statut = document.querySelector(".pro-statut");
const ht = document.querySelector(".tar-ht");
const ttc = document.querySelector(".tar-ttc");

const lines = document.querySelector(".lines");
const btnAdd = document.querySelector(".btn-add-taille");

const btns_delete = document.querySelectorAll(".delete");

const selectCategorie = document.querySelector(".select-categorie");
const categorieParent = document.querySelector(".accueil");

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
const inputImage = document.querySelector(".file");
const output = document.querySelector("output");
let imagesArray = [];

inputImage.addEventListener("change", () => {
  const files = inputImage.files;
  for (let i = 0; i < files.length; i++) {
    imagesArray.push(files[i]);
  }
  console.log(imagesArray);
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
                          class="form-select select-taille"
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
      item.addEventListener("click", function () {
        lines.removeChild(this.parentNode);
      });
    });
  
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

btnEnregistrer.addEventListener("click", async function () {
  const categorieselect = document.querySelector(".select-type-cat");
  const cat_id = categorieselect ? categorieselect.value : 1;
  const pro_new_collect = collect.checked ? true : false;
  const pro_en_avant = avant.checked ? true : false;
  const pro_statut = statut.checked ? true : false;
  const tar_ht = parseFloat(Number(ht.value.replace(",", ".")));
  const tar_ttc = parseFloat(Number(ttc.value.replace(",", ".")));



  const data = {
    cat_id,
    pro_ref: pro_ref.value,
    pro_libelle: pro_libelle.value,
    pro_description: pro_description.value,
    pro_details: pro_details.value,
    pro_new_collect,
    pro_en_avant,
    pro_comment: pro_comment.value,
    pro_statut,
  };

  const produit = await axios.post(`${SITE_URL}/admin/produits/`, data, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });

 
  let resultMedia = [];
  imagesArray.map(async (image) => {
    const dataMedia = {
      med_libelle: image.name.split(".")[0],
      med_ressource: image.name,
    };
    const media = await axios.post(
      `${SITE_URL}/admin/produits/media/${produit.data.product.pro_id}`,
      dataMedia,
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    // console.log(media);
  });

  const tarif = await axios.post(
    `${SITE_URL}/admin/produits/tarif/${produit.data.product.pro_id}`,
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
  
  Array.from(selectTailles, async (item) => {

     const dataselect = {
       tai_id: item.value,
       qua_nbre: parseInt(
         item.parentNode.parentNode.parentNode.children[1].children[1]
           .children[0].value
       ),
     };
      const qty = await axios.post(
        `${SITE_URL}/admin/produits/qty/${produit.data.product.pro_id}`,
        dataselect,
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        }
      );
  }
    
  );
  const message = document.querySelector(".parent-message");
  if (produit.data.msg === true || tarif.data.msgTarif === true) {
    message.style.display = "flex";
    const btn_close = document.querySelector(".close");
    btn_close.addEventListener("click", function () {
      window.location.href = `${SITE_URL}/admin/produits`;
    });
  }


});

//delete taille
  Array.from(btns_delete, (item) => {
    item.addEventListener("click", function () {
      lines.removeChild(this.parentNode);
    });
  });


