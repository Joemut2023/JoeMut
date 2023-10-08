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
    <p class="price">${new Decimal(produit.pad_ttc).toFixed(2).toString()} $</p>
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
            <span>${new Decimal(produit.pad_ttc).toFixed(2).toString()} $</span>
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
        await Kart.getItemNumber();
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
      // compteur++;

      const qte = await Kart.updateItemQuantity(itemId, "up");
      if (qte == compteur) return Kart.RenderMaxQteUpdateModal();
      element.parentNode.parentNode.children[0].value = qte;
      await TotalPricesProducts();
      document.querySelector("#cart-item-count").innerHTML =
        await Kart.getItemNumber();
    });
  });

  btns_down.forEach((element) => {
    element.addEventListener("click", async () => {
      let itemId = element.dataset.id;
      let decrement = element.parentNode.parentNode.children[0].value;

      decrement = isNaN(decrement) ? 1 : decrement;
      if (decrement > 1) {
        decrement--;
        const qte = await Kart.updateItemQuantity(itemId, "down");
        document.querySelector("#cart-item-count").innerHTML =
          await Kart.getItemNumber();
        await TotalPricesProducts();
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
      <span class="title">${
        totalQuantity > 1
          ? `${totalQuantity} articles`
          : `${totalQuantity} article`
      }</span>
      <span class="price">${new Decimal(totalPriceht).toFixed(2).toString()}  €</span>
    </div>
    <div class="item">
      <span class="title">Delivery</span>
      <span class="price">${new Decimal(
        storedFrais.frais_port
      ).toFixed(2).toString()} €</span>
    </div>
    <div class="item">
      <span class="title">Application fees</span>
      <span class="price">${new Decimal(
        storedFrais.frais_dossier
      ).toFixed(2).toString()} €</span>
    </div>
    <hr>
  </div>
  <div class="item total">
  <span>TTC</span>
  <span>${new Decimal(totalPoductPrice).toFixed(2).toString()} €</span>
</div>
<div class="promo">
  <div class="link">
    <p class="btnpromo"><span>Do you have a promo code for a product?</span></p>
  </div>
  <div class="hide-promo promo_block">
    <div class="btn-promo">
      <input id="input-code-promo" type="text" placeholder="Promotion Code" />
      <button id="btn-code-promo">Add</button>
    </div>
    <p class="fermer">Close</p>
  </div>
</div>
<p id="promo-notice"><span id="promo-notice-asterics">*</span> Only the promo code  for product</p>
<a href="/commander/#page-commander" class="button">
  <button class="enable">Finalize the Quote</button>
</a>
  `;

  PanierPrice.innerHTML = PanierPriceHtml;
  const link_parag = document.querySelector(".btnpromo");
  const btn_promo = document.querySelector(".btn-promo");
  const code_promo_block = document.querySelector(".promo_block");
  const btn_fermer = document.querySelector(".fermer");
  const btnFinaliser = document.querySelector(".enable");
  const btnCodePromo = document.querySelector("#btn-code-promo");
  const inputCodePromo = document.querySelector("#input-code-promo");
  if (storedITems.length == 0) {
    emptyKartText.style.display = "block";
    btnFinaliser.disabled = true;
    btnFinaliser.classList.add("btn-enabled");
  }
  link_parag?.addEventListener("click", function () {
    link_parag.classList.add("linkhide");

    code_promo_block.classList.remove("hide-promo");
    code_promo_block.classList.add("code-promo");

    btnCodePromo.addEventListener("click", async () => {
      await Kart.addCodePromo(inputCodePromo.value);
      inputCodePromo.value = "";
    });
  });

  btn_fermer?.addEventListener("click", function () {
    link_parag.classList.remove("linkhide");
    code_promo_block.classList.remove("code-promo");
    code_promo_block.classList.add("hide-promo");
  });
};
TotalPricesProducts();
