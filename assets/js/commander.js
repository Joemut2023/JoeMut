//change for big title on bloc-form
const adresseForm = document.querySelector("#adresse-form");
const livraisonForm = document.querySelector("#livraison-form");
const codePromoForm = document.querySelector("#codepromo-form");
const adresseDiv = document.querySelector("#divAdress");
const livraisonDiv = document.querySelector("#divLivraison");
const finalisationDiv = document.querySelector("#divFinalisation");
const codePromoDiv = document.querySelector("#divCodePromo");
const adresseContainer = document.querySelector("#adresse");
const livraisonContainer = document.querySelector("#livraison");
const codePromoContainer = document.querySelector("#codePromo");
const finalisationContainer = document.querySelector("#finalisation");
const btnModiferInfo = document.querySelector("#info-mod-btn");
const btnModiferAdresse = document.querySelector("#adresse-mod-btn");
const btnModiferAdresseLiv = document.querySelector("#adresseLiv-mod-btn");
const btnModiferlivraison = document.querySelector("#livraison-mod-btn");
const btnModifiercodePromo = document.querySelector("#codePromo-mod-btn");
const btnModiferfinalisation = document.querySelector("#finalisation-mod-btn");
const checkSuccess = document.querySelector(".check-success");
const checkAdresse = document.querySelector(".check-adresse");
const checkAdressLiv =  document.querySelector(".check-adresseLiv");
const checkLivraison = document.querySelector(".check-livraison");
const checkCodePromo = document.querySelector(".check-codePromo");
const cursorAdresse = document.querySelector(".adresse-cursor");
const cursorAdresseLiv = document.querySelector(".adresseLiv-cursor");
const cursorfinalisation = document.querySelector(".finalisation-cursor");
const cursorLivraison = document.querySelector(".livraison-cursor");
const cursorcodePromo = document.querySelector(".codePromo-cursor");
const borderNumber = document.querySelector(".border-number");
const adresseBg = document.querySelector(".adresse-bg");
const adresseLivBg = document.querySelector(".adresseLiv-bg");
const livraisonBg = document.querySelector(".livraison-bg");
const codePromoBg = document.querySelector(".codePromo-bg");

const adresse_elements = document.querySelectorAll(".adresse-elmt-radio");
//console.log(adresse_elements);

adresse_elements.forEach(element => {
  element.addEventListener("click",(e)=>{
    let label = document.querySelector(`[for=${e.target.name}]`);
    // label.style.border  = "solid 2px #a0b21f"
    // label.classList.remove("adresse-elmt")
    // label.classList.add("active-adresse");

    
    //console.log(label.classList.contains('active-adresse'))
    if (label.classList.contains("active-adresse")) {

      label.classList.remove("active-adresse");
      label.classList.add("adresse-elmt");

    } else {
      // si l'elt ne pas active
      let getActive = document.querySelector('.active-adresse');
      if(getActive !== null) {
        getActive.classList.remove("active-adresse");
      }
      label.classList.add("active-adresse");

    }
  })

});

const adresseLiv = document.querySelector("#adresse-livraison")
const adresseLivContent = document.querySelector("#divAdressLiv")
const adresseLivraisonBg = document.querySelector(".adresseLivraisonBg")
const finalisationBg = document.querySelector(".finalisation-bg");

const radioConfirmDevis = document.querySelector("#confirm_devis");
const checkConditionsGeneral = document.querySelector("#flexCheckDefault");
const btn_finaliser_devis = document.querySelector(".btn_finaliser_devis");

//for class tabs
const navlink_one = document.querySelector(".btn-tab-one");
const navlink_two = document.querySelector(".btn-tab-two");
const password = document.getElementById("password");
const btn = document.getElementById("btn-action");

//animation code promoif-codepromo
const formPromo = document.querySelector(".form-promo");
const closeForme = document.querySelector("#close-form");
const textPromo = document.querySelector(".text-promo");
const ifCodePromo = document.querySelector("#if-codepromo");

// ifCodePromo.addEventListener("click", () => {
//   formPromo.style.display = "block";
//   textPromo.style.display = "none";
// });

// closeForme.addEventListener("click", () => {
//   formPromo.style.display = "none";
//   textPromo.style.display = "block";
// });

radioConfirmDevis.addEventListener("change", () => {
  checkConditionsGeneral.removeAttribute("disabled");
})

checkConditionsGeneral.addEventListener("change", (e) => {
  if (e.target.checked){
     btn_finaliser_devis.removeAttribute("disabled");
     btn_finaliser_devis.style.backgroundColor = "#a0b21f";
     btn_finaliser_devis.style.cursor = "pointer";
  }else{
    btn_finaliser_devis.setAttribute("disabled","true");
    btn_finaliser_devis.style.backgroundColor = "#eee";
    btn_finaliser_devis.style.cursor = "not-allowed";
  }
});

/**
 * 
 * @param {*} nextDiv 
 * @param {*} currentDiv 
 * @param {*} btnModifier 
 * @param {*} nexDiv 
 * @param {*} changeBorder 
 * @param {*} iconSuccess 
 * @param {*} eventCursor 
 * @param {*} classAdresse 
 */
const eventAccordeonForm = (
  nextDiv,
  currentDiv,
  btnModifier,
  nexDiv,
  changeBorder,
  iconSuccess,
  eventCursor,
  classAdresse
) => {
  nextDiv.style.display = "block";
  currentDiv.style.display = "none";
  btnModifier.style.display = "block";
  nexDiv.style.opacity = "1";
  changeBorder.style.color = "grey";
  changeBorder.style.backgroundColor = "white";
  changeBorder.style.border = "1px solid grey";
  iconSuccess.style.display = "block";
  eventCursor.style.cursor = "default";
  classAdresse.style.backgroundColor = "#61ce70";
  classAdresse.style.color = "white";
  classAdresse.style.border = "1px solid #61ce70";
};

adresseForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  eventAccordeonForm(
    adresseLivContent,
    adresseDiv,
    btnModiferAdresse,
    adresseLiv,
    adresseBg,
    checkAdresse,
    cursorAdresseLiv,
    adresseLivBg
  );
});
btnModiferAdresse.addEventListener("click", (event) => {
  adresseLivContent.style.display = "none";
  adresseDiv.style.display = "block";
  borderNumber.style.color = "white";
  borderNumber.style.backgroundColor = "#61ce70";
  borderNumber.style.border = "1px solid #61ce70";
  checkSuccess.style.display = "none";
  adresseLivBg.style.color = "grey";
  adresseLivBg.style.backgroundColor = "white";
  adresseLivBg.style.border = "1px solid grey";
});

adresseLiv?.addEventListener("submit", (event) => {
  event.preventDefault();
  eventAccordeonForm(
    livraisonDiv,
    adresseLivContent,
    btnModiferAdresseLiv,
    livraisonContainer,
    adresseLivBg,
    checkAdressLiv,
    cursorLivraison,
    livraisonBg
  );
});

btnModiferAdresseLiv.addEventListener("click", (event) => {
  event.preventDefault();
  livraisonDiv.style.display = "none";
  adresseLivContent.style.display = "block";
  adresseLivraisonBg.style.color = "white";
  adresseLivraisonBg.style.backgroundColor = "#61ce70";
  adresseLivraisonBg.style.border = "1px solid #61ce70";
  checkAdressLiv.style.display = "none";
  livraisonBg.style.color = "grey";
  livraisonBg.style.backgroundColor = "white";
  livraisonBg.style.border = "1px solid grey";
});


//change events on livraisonForm
livraisonForm.addEventListener("submit", (event) => {
  event.preventDefault();
  eventAccordeonForm(
    codePromoDiv,
    livraisonDiv,
    btnModiferlivraison,
    codePromoContainer,
    livraisonBg,
    checkLivraison,
    cursorfinalisation,
    codePromoBg
  );
});

codePromoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  eventAccordeonForm(
    finalisationDiv,
    codePromoDiv,
    btnModifiercodePromo,
    finalisationContainer,
    codePromoBg,
    checkCodePromo,
    cursorcodePromo,
    finalisationBg
  );
});

btnModiferlivraison.addEventListener("click", (event) => {
  event.preventDefault();
  codePromoDiv.style.display = "none";
  livraisonDiv.style.display = "block";
  livraisonBg.style.color = "white";
  livraisonBg.style.backgroundColor = "#61ce70";
  livraisonBg.style.border = "1px solid #61ce70";
  checkLivraison.style.display = "none";
  codePromoBg.style.color = "grey";
  codePromoBg.style.backgroundColor = "white";
  codePromoBg.style.border = "1px solid grey";
});

btnModifiercodePromo.addEventListener("click", (event) => {
  event.preventDefault();
  finalisationDiv.style.display = "none";
  codePromoDiv.style.display = "block";
  codePromoBg.style.color = "white";
  codePromoBg.style.backgroundColor = "#61ce70";
  codePromoBg.style.border = "1px solid #61ce70";
  checkCodePromo.style.display = "none";
  finalisationBg.style.color = "grey";
  finalisationBg.style.backgroundColor = "white";
  finalisationBg.style.border = "1px solid grey";
});

//event hide/show password on form
btn?.addEventListener("click", function (e) {
  e.preventDefault();

  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  if (password.getAttribute("type") === "password") btn.textContent = "Montrer";
  else btn.textContent = "Cacher";
});

//tabs
navlink_one?.addEventListener("click", function () {
  navlink_one.classList.add("button-add");
  navlink_two.classList.remove("button-add");
});

navlink_two?.addEventListener("click", function () {
  navlink_two.classList.add("button-add");
  navlink_one.classList.remove("button-add");
});

function toggle_visibility(id) {
  var element = document.getElementById(id);
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}
(async () => {
  const qte = await Kart.getItemNumber();
  let radios = document.querySelectorAll("[name=radio_mode_livraison]");
  document.querySelector("#cmd-item-panier").innerHTML = qte ? qte : 0;
  const artcle = qte == 0 ? "article" : "articles";
  document.querySelector("#article").innerHTML = artcle;
  const { kartProductPrice, totalPrice } = await Kart.calculTotalPrice();
  document.querySelector("#sous-total").innerHTML = `${kartProductPrice
    .toFixed(2)
    .toString()
    .replace(".", ",")} €`;

  let fraisDivers = await Kart.addFraisDivers();
  document.querySelector(
    "#dossier-price"
  ).innerHTML = `${fraisDivers.frais_dossier
    .toFixed(2)
    .toString()
    .replace(".", ",")} €`;
  document.querySelector(
    "#livraison-price"
  ).innerHTML = `${fraisDivers.frais_port
    .toFixed(2)
    .toString()
    .replace(".", ",")} €`;
  document.querySelector("#total-price").innerHTML = `${totalPrice
    .toFixed(2)
    .toString()
    .replace(".", ",")} €`;
  radios?.forEach((radio) => {
    radio.addEventListener("click", (e) => {
      let frp_ttc = e.target.dataset.ttc;
      const total =
        parseFloat(frp_ttc) + kartProductPrice + fraisDivers.frais_dossier;
      document.querySelector("#total-price").innerHTML = `${total
        .toFixed(2)
        .toString()
        .replace(".", ",")} €`;
      document.querySelector("#livraison-price").innerHTML = `${parseFloat(
        frp_ttc
      )
        .toFixed(2)
        .toString()
        .replace(".", ",")} €`;
    });
  });
})();

const hiddenDetailsBtn = document.querySelector("#hidden-detail");
const detailItem = document.querySelector(".detail-items");

hiddenDetailsBtn.addEventListener("click", () => {
  if (detailItem.classList.contains("detail-items")) {
    detailItem.classList.remove("detail-items");
  } else {
    detailItem.classList.add("detail-items");
  }
});
