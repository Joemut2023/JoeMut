const btns_up = document.querySelectorAll(".btn-up");
const btns_down = document.querySelectorAll(".btn-down");
const link_parag = document.querySelector(".btnpromo");
const btn_promo = document.querySelector(".btn-promo");
const code_promo_block = document.querySelector(".promo_block");
const btn_fermer = document.querySelector(".fermer");
const panierDetails = document.querySelector(".comment");
const btnTrash = document.querySelectorAll(".btn-down");
console.log(btnTrash);

const storedITems = Kart.getParsedBasket();
let panierDetailsHtml = ``;

storedITems.map((produit) => {
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
              <button class="btn-up">
                <span><i class="fa-solid fa-chevron-up"></i></span>
              </button>
              <button class="btn-down">
                <span><i class="fa-solid fa-chevron-down"></i></span>
              </button>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 prx">
            <span>${produit.pad_ttc} €</span>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-2 delete">
        <span><i class="fa-solid fa-trash"></i></span>
      </div>
    </div>
  </div>
  </div>
`;
});
panierDetails.innerHTML = panierDetailsHtml;

btns_up.forEach((element) => {
  element.addEventListener("click", function () {
    let compteur = element.parentNode.parentNode.children[0].value;
    compteur = isNaN(compteur) ? 1 : compteur;
    compteur++;
    element.parentNode.parentNode.children[0].value = compteur;
  });
});

btns_down.forEach((element) => {
  element.addEventListener("click", function () {
    console.log("ds");
    let decrement = element.parentNode.parentNode.children[0].value;
    decrement = isNaN(decrement) ? 1 : decrement;
    if (decrement > 1) decrement--;
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
