const form = document.querySelector(".form");
const btn_envoyer = document.querySelector(".btn-envoyer");
const send = document.querySelector(".ville").value;


// if (send) {
//   btn_envoyer.setAttribute("data-bs-toggle", "modal");
//   btn_envoyer.setAttribute("data-bs-target", "#sendModalLabel");
// }

form.addEventListener("submit", function(){
  btn_envoyer.setAttribute("data-bs-toggle", "modal");
  btn_envoyer.setAttribute("data-bs-target", "#sendModalLabel");
})
