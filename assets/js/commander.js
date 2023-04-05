const password = document.getElementById("password");
const btn = document.getElementById("btn-action");
const infoForm = document.querySelector('#info-form')
const adresseForm = document.querySelector('#adresse-form')
const livraisonForm = document.querySelector('#livraison-form')
const infoContent = document.querySelector('#info-content')
const adresseDiv = document.querySelector('#divAdress')
const livraisonDiv = document.querySelector('#divLivraison')
const finalisationDiv = document.querySelector('#divFinalisation')
const adresseContainer = document.querySelector('#adresse')
const livraisonContainer = document.querySelector('#livraison')
const finalisationContainer = document.querySelector('#finalisation')
const btnModiferInfo = document.querySelector('#info-mod-btn')
const btnModiferAdresse = document.querySelector('#adresse-mod-btn')
const btnModiferlivraison = document.querySelector('#livraison-mod-btn')
const btnModiferfinalisation = document.querySelector('#finalisation-mod-btn')
    // const btnModiferInfo = document.querySelector('#info-mod-btn')
const faCheck = document.querySelector('#faCheck')


const eventAccordeonForm = (nextDiv, currentDiv, btnModifier, nexDiv, ) => {
    nextDiv.style.display = "block"
    currentDiv.style.display = "none"
    btnModifier.style.display = "block"
    nexDiv.style.opacity = "1"
}

infoForm.addEventListener("submit", (event) => {
    event.preventDefault()
    eventAccordeonForm(adresseDiv, infoContent, btnModiferInfo, adresseContainer)
})
btnModiferInfo.addEventListener("click", (event) => {
    event.preventDefault()
    adresseDiv.style.display = "none"
    infoContent.style.display = "flex"
    adresseTitle.style.pointerEvents = "none"
    adresseTitle.style.opacity = "0.6"
})
adresseForm.addEventListener("submit", (event) => {
        event.preventDefault()
        eventAccordeonForm(livraisonDiv, adresseDiv, btnModiferAdresse, livraisonContainer)
    }) // pointer-events: none;

livraisonForm.addEventListener("submit", (event) => {
    event.preventDefault()
    eventAccordeonForm(finalisationDiv, livraisonDiv, btnModiferlivraison, finalisationContainer)
})


btn.addEventListener("click", function(e) {
    e.preventDefault()

    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    if (password.getAttribute("type") === "password")
        btn.textContent = "Montrer"
    else
        btn.textContent = "Cacher"
})

function toggle_visibility(id) {
    var element = document.getElementById(id);
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}