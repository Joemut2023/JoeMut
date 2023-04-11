const navlink_one = document.querySelector(".btn-tab-one");
const navlink_two = document.querySelector(".btn-tab-two");
const input = document.querySelector(".number-value");
const btnAjouter = document.querySelector(".btn-add");

const btn_up = document.querySelector(".btn-up");
const btn_down = document.querySelector(".btn-down");

const image_grand = document.querySelector(".img-grand");
const image_small = document.querySelectorAll(".img-small");
const default_img = document.querySelector(".default_img");
const small_img_carousel = document.querySelector(".small_carousel");

navlink_one.addEventListener("click", function () {
  navlink_one.classList.add("button-add");
  navlink_two.classList.remove("button-add");
});

navlink_two.addEventListener("click", function () {
  navlink_two.classList.add("button-add");
  navlink_one.classList.remove("button-add");
});

btn_up.addEventListener("click", function () {
  let compteur = document.querySelector(".number-value").value;
  compteur = isNaN(compteur) ? 1 : compteur;
  compteur++;
  input.value = compteur;
});

btn_down.addEventListener("click", function () {
  let compteur = parseInt(document.querySelector(".number-value").value);
  compteur = isNaN(compteur) ? 1 : compteur;
  if (compteur > 1) compteur--;
  input.value = compteur;
});

image_small.forEach((element) => {
  element.addEventListener("click", function () {
    image_grand.src = element.src;
  });
});

input.addEventListener("input", function () {
  input.value = input.value.replace(/[^0-9]/gi, "1");
});

btnAjouter.addEventListener("click", async () => {
  const qte = input.value;
  let itemId = parseInt(btnAjouter.dataset.id);
  let produit = await axios.get(`${SITE_URL}/article/${itemId}`, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  Kart.addItem(produit.data, qte);
  myModal.style.display = "flex";
});

small_img_carousel.forEach((element) => {
  element.addEventListener("click", function () {
    default_img.src = element.src;
  });
});
