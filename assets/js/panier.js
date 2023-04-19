const panierDetails = document.querySelector(".comment");
const PanierPrice = document.querySelector(".panier-price");
const emptyKartText = document.querySelector("#empty-product-kart");
let storedITems = Kart.getAllPanierDetails();
let TotalePrice = 0;

const RenderKartProduct = async () => {
  let panierDetailsHtml = ``;
  storedITems = await Kart.getAllPanierDetails();
  storedITems?.map((produit) => {
    panierDetailsHtml += `
  <div class="articles row">
    <div class="col-md-1 col-sm-1 col-1 id">${produit.Produit.pro_ref}</div>
  <div class="col-md-3 col-sm-4 col-4 image">
    <span><img src="/images/produits/${
      produit.Produit.Media[0].med_ressource
    }" class="img-fluid" alt="" /></span>
  </div>
  <div class="col-md-3 col-sm-7 col-7 description">
    <div class="desc">
      <a href="/article/${produit.pro_id}"><span>${
      produit.Produit.pro_libelle
    }</span></a>
    </div>
    <p class="price">${produit.pad_ttc.toFixed(2)} €</p>
  </div>
  <div class="col-md-5 col-sm-12 col-12 prices">
    <div class="row">
    <div class="hidden col-sm-4 col-3"></div>
      <div class="col-md-10 col-sm-6 col-7 block-price">
        <div class="row compteur">
          <div class="col-md-6 col-sm-6 col-6 qty-btn">
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
          <div class="col-md-6 col-sm-6 col-6 prx">
            <span>${produit.pad_ttc.toFixed(2)} €</span>
          </div>
        </div>
      </div>
      <div data-id="${produit.pro_id}" class="col-md-2 col-sm-2 col-2 delete">
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
      element.addEventListener("click", async () => {
        let itemId = element.dataset.id;
        await Kart.removeItem(itemId);
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
    element.addEventListener("click", async () => {
      TotalPricesProducts;
      let itemId = element.dataset.id;
      await Kart.removeItem(itemId);
      TotalPricesProducts();
      document.querySelector("#cart-item-count").innerHTML =
        Kart.getItemNumber();
      await RenderKartProduct();
      eventlistner(async () => {
        await Kart.removeItem(itemId);
        await RenderKartProduct();
      });
    });
  });

  if (storedITems.length == 0) {
    emptyKartText.style.display = "block";
    btnFinaliser.disabled = true;
    btnFinaliser.classList.add("btn-enabled");
  }
};

(async () => {
  await RenderKartProduct();
  const btns_up = document.querySelectorAll(".btn-up");
  const btns_down = document.querySelectorAll(".btn-down");
  btns_up.forEach((element) => {
    element.addEventListener("click", async () => {
      let itemId = element.dataset.id;
      let compteur = element.parentNode.parentNode.children[0].value;
      compteur = isNaN(compteur) ? 1 : compteur;
      compteur++;
     
      const qte = await Kart.updateItemQuantity(itemId, "up");
      console.log(qte);
      element.parentNode.parentNode.children[0].value =  qte;
      TotalPricesProducts();
      document.querySelector("#cart-item-count").innerHTML =
        Kart.getItemNumber();
    });
  });

  btns_down.forEach((element) => {
    element.addEventListener("click", async () => {
      let itemId = element.dataset.id;
      let decrement = element.parentNode.parentNode.children[0].value;

      decrement = isNaN(decrement) ? 1 : decrement;
      if (decrement > 1) {
        decrement--;
        const qte =  await Kart.updateItemQuantity(itemId, "down");
        console.log(qte);
        document.querySelector("#cart-item-count").value = qte
        TotalPricesProducts();
          Kart.getItemNumber();
      }
      element.parentNode.parentNode.children[0].value = decrement;
    });
  });
})();

const TotalPricesProducts = async () => {
  let storedITems = await Kart.getAllPanierDetails();
  let storedFrais = await Kart.addFraisDivers();
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
      <span class="price">${parseFloat(storedFrais.frais_port).toFixed(
        2
      )} €</span>
    </div>
    <div class="item">
      <span class="title">Frais de dossier</span>
      <span class="price">${parseFloat(storedFrais.frais_dossier).toFixed(
        2
      )} €</span>
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
