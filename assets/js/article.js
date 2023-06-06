// const navlink_one = document.querySelector(".btn-add");
// console.log(navlink_one,"one");
// const navlink_two = document.querySelector(".btn-tab-two");
const input = document.querySelector(".number-value");
const btnAjouter = document.querySelector(".btn-add");
const btn_envoyer = document.querySelector(".btn-envoyer");
const form = document.querySelector(".form")
const titre = document.querySelector(".titre");
const contenu = document.querySelector(".contenu");
const btn_close_avis = document.querySelector(".close-avis");
const stars = document.querySelectorAll(".star");

const btn_up = document.querySelector(".btn-up");
const btn_down = document.querySelector(".btn-down");

const image_grand = document.querySelector(".img-grand");
const image_small = document.querySelectorAll(".img-small");
const default_img = document.querySelector(".default_img");
const image_grand_carousel = document.querySelector(".img_grand_carousel");
const small_img_carousel = document.querySelectorAll(".small_carousel");
const btn_share_facebook = document.querySelector(".btn-share-facebook");

// navlink_one.addEventListener("click", function () {
//   navlink_one.classList.add("button-add");
//   navlink_two.classList.remove("button-add");
// });

// navlink_two.addEventListener("click", function () {
//   navlink_two.classList.add("button-add");
//   navlink_one.classList.remove("button-add");
// });

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

small_img_carousel.forEach((element) => {
  element.addEventListener("click", function () {
    image_grand_carousel.src = element.src;
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
  await Kart.addItem(produit.data, qte);
  myModal.style.display = "flex";
  input.value = "1"
});

if (small_img_carousel.length > 1) {
  small_img_carousel.forEach((element) => {
    element.addEventListener("click", function () {
      default_img.src = element.src;
    });
  });
}

form.addEventListener("click", function () {
  btn_envoyer.setAttribute("data-bs-toggle", "modal");
  btn_envoyer.setAttribute("data-bs-target", "#sendModalLabel");
 
});

btn_close_avis.addEventListener("click", function(){
  titre.value = ""
  contenu.value = ""
})

stars.forEach(element => {
  element.addEventListener("click", function(){
    element.classList.toggle("star-color");
  })
});


function shareOnFacebook() {
  const navUrl =
    "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href;
  window.open(navUrl, "_blank");
}

btn_share_facebook.addEventListener("click", function(e){
  e.preventDefault()
  shareOnFacebook();
})



var swiper = new Swiper(".carousel", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 15,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 3,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});



