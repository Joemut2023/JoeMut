const link_parag = document.querySelector(".btnpromo");
const btn_promo = document.querySelector(".btn-promo");
const code_promo_block = document.querySelector(".promo_block");
const btn_fermer = document.querySelector(".fermer");
const panierDetails = document.querySelector(".comment");
const PanierPrice = document.querySelector(".panier-price");
const emptyKartText = document.querySelector("#empty-product-kart");
let storedITems = Kart.getParsedBasket();
let ProductQuantity = 0;
let TotalePrice = 0;

const RenderKartProduct = () => {
  let panierDetailsHtml = ``;
  storedITems = Kart.getParsedBasket();
  storedITems.map((produit) => {
    ProductQuantity = ProductQuantity + produit.pad_qte;
    panierDetailsHtml += `
  <div class="articles row">
    <div class="col-md-1 clo-sm-1 id">${produit.pro_ref}</div>
  <div class="col-md-3 col-sm-4 image">
    <img src="/images/produits/${produit.media}" class="img-fluid" alt="" />
  </div>
  <div class="col-md-3 col-sm-7 description">
    <div class="desc">
      <a href="/article/${produit.pro_id}"><span>${produit.pro_libelle}</span></a>
    </div>
    <p class="price">${produit.pad_ttc} €</p>
  </div>
  <div class="col-md-5 col-sm-12 prices">
    <div class="row">
      <div class="col-md-6 col-sm-10 block-price">
        <div class="row compteur">
          <div class="col-md-6 col-sm-6 qty-btn">
            <input type="text" class="number-value" value="${produit.pad_qte}" />
            <div class="btns">
              <button data-id="${produit.pro_id}" class="btn-up">
                <span><i class="fa-solid fa-chevron-up"></i></span>
              </button>
              <button data-id="${produit.pro_id}" class="btn-down">
                <span><i class="fa-solid fa-chevron-down"></i></span>
              </button>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 prx">
            <span>${produit.pad_ttc} €</span>
          </div>
        </div>
      </div>
      <div data-id="${produit.pro_id}" class="col-md-6 col-sm-2 delete">
        <span><i  class="fa-solid fa-trash" ></i></span>
      </div>
    </div>
  </div>
  </div>
`;
  });
  panierDetails.innerHTML = panierDetailsHtml;
};

RenderKartProduct();
storedITems.length == 0 ? (emptyKartText.style.display = "block") : null;
const btns_up = document.querySelectorAll(".btn-up");
const btns_down = document.querySelectorAll(".btn-down");
const btnTrash = document.querySelectorAll(".delete");

let eventlistner = (callback) => {
  const btnTrash = document.querySelectorAll(".delete");
  btnTrash.forEach((element) => {
    element.addEventListener("click", () => {
      let itemId = element.dataset.id;
      Kart.removeItem(itemId);
      callback();
      storedITems.length == 0 ? (emptyKartText.style.display = "block") : null;
    });
  });
};
btnTrash.forEach((element) => {
  element.addEventListener("click", () => {
    let itemId = element.dataset.id;
    Kart.removeItem(itemId);
    RenderKartProduct();
    eventlistner(() => {
      RenderKartProduct();
    });
  });
});
const TotalPricesProducts = () => {
  let PanierPriceHtml = ` 
  <div class="frais">
    <div class="item">
      <span class="title">${ProductQuantity} articles</span>
      <span class="price">18,0 €</span>
    </div>
    <div class="item">
      <span class="title">Livraisons</span>
      <span class="price">3,00 €</span>
    </div>
    <div class="item">
      <span class="title">Frais de dossier</span>
      <span class="price">15,00 €</span>
    </div>
  </div>`;

  PanierPrice.innerHTML = PanierPriceHtml;
};
TotalPricesProducts();
btns_up.forEach((element) => {
  element.addEventListener("click", () => {
    let itemId = element.dataset.id;
    let compteur = element.parentNode.parentNode.children[0].value;
    compteur = isNaN(compteur) ? 1 : compteur;
    compteur++;
    element.parentNode.parentNode.children[0].value = compteur;
    ProductQuantity = ProductQuantity + 1;
    Kart.updateItemQuantity(itemId, 1);
    TotalPricesProducts();
  });
});

btns_down.forEach((element) => {
  element.addEventListener("click", () => {
    let itemId = element.dataset.id;
    let decrement = element.parentNode.parentNode.children[0].value;
    decrement = isNaN(decrement) ? 1 : decrement;
    if (decrement > 1) {
      decrement--;
      ProductQuantity -=1
      console.log(decrement, "decrement");
      Kart.updateItemQuantity(itemId, 0);
      TotalPricesProducts();
      console.log(ProductQuantity, "qtéproductu");
    }
    element.parentNode.parentNode.children[0].value = decrement;
  });
});

link_parag.addEventListener("click", function () {
  link_parag.classList.add("linkhide");

  code_promo_block.classList.remove("hide-promo");
  code_promo_block.classList.add("code-promo");
});

btn_fermer.addEventListener("click", function () {
  link_parag.classList.remove("linkhide");
  code_promo_block.classList.remove("code-promo");
  code_promo_block.classList.add("hide-promo");
});
