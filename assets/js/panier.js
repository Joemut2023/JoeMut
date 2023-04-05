const btns_up = document.querySelectorAll(".btn-up");
const btns_down = document.querySelectorAll(".btn-down");
const link_parag = document.querySelector(".btnpromo");
const btn_promo = document.querySelector(".btn-promo");
const code_promo_block = document.querySelector(".promo_block");
const btn_fermer = document.querySelector(".fermer");

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
    let decrement = element.parentNode.parentNode.children[0].value;
    console.log
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
