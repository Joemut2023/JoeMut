const panierDetails = document.querySelector(".comment");
const PanierPrice = document.querySelector(".panier-price");
const emptyKartText = document.querySelector("#empty-product-kart");
let storedITems = Kart.getParsedBasket();
let TotalePrice = 0;

const RenderKartProduct = () => {
  let panierDetailsHtml = ``;
  storedITems = Kart.getParsedBasket();
  storedITems.map((produit) => {
    panierDetailsHtml += `
  <div class="articles row">
    <div class="col-md-1 clo-sm-1 id">${produit.pro_ref}</div>
  <div class="col-md-3 col-sm-4 image">
    <img src="/images/produits/${produit.media}" class="img-fluid" alt="" />
  </div>
  <div class="col-md-3 col-sm-7 description">
    <div class="desc">
      <a href="/article/${produit.pro_id}"><span>${
      produit.pro_libelle
    }</span></a>
    </div>
    <p class="price">${produit.pad_ttc.toFixed(2)} €</p>
  </div>
  <div class="col-md-5 col-sm-12 prices">
    <div class="row">
      <div class="col-md-6 col-sm-10 block-price">
        <div class="row compteur">
          <div class="col-md-4 col-sm-6 qty-btn">
            <input type="text" class="number-value" value="${
              produit.pad_qte
            }" />
            <div class="btns">
              <button data-id="${produit.pro_id}" class="btn-up">
                <span><i class="fa-solid fa-chevron-up"></i></span>
              </button>
              <button data-id="${produit.pro_id}" class="btn-down">
                <span><i class="fa-solid fa-chevron-down"></i></span>
              </button>
            </div>
          </div>
          <div class="col-md-8 col-sm-6 prx">
            <span>${produit.pad_ttc.toFixed(2)} €</span>
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
  const btnTrash = document.querySelectorAll(".delete");
  const btnFinaliser = document.querySelector(".enable");

  let eventlistner = (callback) => {
    const btnTrash = document.querySelectorAll(".delete");
    btnTrash.forEach((element) => {
      element.addEventListener("click", () => {
        let itemId = element.dataset.id;
        Kart.removeItem(itemId);
        TotalPricesProducts();
        document.querySelector("#cart-item-count").innerHTML =
          Kart.getItemNumber();
        callback();
        if (storedITems.length == 0) {
          emptyKartText.style.display = "block";
          btnFinaliser.disabled = true;
          btnFinaliser.classList.add("btn-enabled");
        }
      });
    });
  };
  btnTrash.forEach((element) => {
    element.addEventListener("click", () => {
      TotalPricesProducts;
      let itemId = element.dataset.id;
      Kart.removeItem(itemId);
      TotalPricesProducts();
      document.querySelector("#cart-item-count").innerHTML =
        Kart.getItemNumber();
      RenderKartProduct();
      eventlistner(() => {
        RenderKartProduct();
      });
    });
  });

  if (storedITems.length == 0) {
    emptyKartText.style.display = "block";
    btnFinaliser.disabled = true;
    btnFinaliser.classList.add("btn-enabled");
  }
};

RenderKartProduct();

const btns_up = document.querySelectorAll(".btn-up");
const btns_down = document.querySelectorAll(".btn-down");

const TotalPricesProducts = () => {
  let storedITems = Kart.getParsedBasket();
  let storedFrais = Kart.getParsedFrais();
  let totalPriceht = 0;
  let totalPoductPrice = 0;
  let totalQuantity = 0;
  storedITems.forEach((element) => {
    totalQuantity += element.pad_qte;
    totalPriceht += element.pad_qte * element.pad_ttc;
  });
  totalPoductPrice =
    totalPriceht +
    parseFloat(storedFrais.frais_port) +
    parseFloat(storedFrais.frais_dossier);
  let PanierPriceHtml = ` 
  <div class="frais">
    <div class="item">
      <span class="title">${totalQuantity} articles</span>
      <span class="price">${totalPriceht.toFixed(2)}  €</span>
    </div>
    <div class="item">
      <span class="title">Livraisons</span>
      <span class="price">${storedFrais.frais_port} €</span>
    </div>
    <div class="item">
      <span class="title">Frais de dossier</span>
      <span class="price">${storedFrais.frais_dossier} €</span>
    </div>
    <hr>
  </div>
  <div class="item total">
  <span>TTC</span>
  <span>${totalPoductPrice.toFixed(2)} €</span>
</div>
<div class="promo">
  <div class="link">
    <p class="btnpromo"><span>Vous avez un code promo ?</span></p>
  </div>
  <div class="hide-promo promo_block">
    <div class="btn-promo">
      <input type="text" placeholder="Code promo" />
      <button>Ajouter</button>
    </div>
    <p class="fermer">Fermer</p>
  </div>
</div>
<a href="/commander/#page-commander" class="button">
  <button class="enable">Finaliser le Devis</button>
</a>
  `;

  PanierPrice.innerHTML = PanierPriceHtml;
};
TotalPricesProducts();
const link_parag = document.querySelector(".btnpromo");
const btn_promo = document.querySelector(".btn-promo");
const code_promo_block = document.querySelector(".promo_block");
const btn_fermer = document.querySelector(".fermer");
const btnFinaliser = document.querySelector(".enable");
if (storedITems.length == 0) {
  emptyKartText.style.display = "block";
  btnFinaliser.disabled = true;
  btnFinaliser.classList.add("btn-enabled");
}

btns_up.forEach((element) => {
  element.addEventListener("click", () => {
    let itemId = element.dataset.id;
    let compteur = element.parentNode.parentNode.children[0].value;
    compteur = isNaN(compteur) ? 1 : compteur;
    compteur++;
    element.parentNode.parentNode.children[0].value = compteur;
    Kart.updateItemQuantity(itemId, true);
    TotalPricesProducts();
    document.querySelector("#cart-item-count").innerHTML = Kart.getItemNumber();
  });
});

btns_down.forEach((element) => {
  element.addEventListener("click", () => {
    let itemId = element.dataset.id;
    let decrement = element.parentNode.parentNode.children[0].value;
    decrement = isNaN(decrement) ? 1 : decrement;
    if (decrement > 1) {
      decrement--;
      Kart.updateItemQuantity(itemId, false);
      TotalPricesProducts();
      document.querySelector("#cart-item-count").innerHTML =
        Kart.getItemNumber();
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
