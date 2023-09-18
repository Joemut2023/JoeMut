const password = document.getElementById("password");
const btn = document.getElementById("btn-action");
const btn_enregistrer = document.getElementById("enregister");

const showErrorMsg = (error) => {
  document.querySelector("#error-mesage").innerHTML = error;
  document.querySelector("#alert-show").classList.remove("hide-alert");
  window.scrollTo(0, 0);
};

btn.addEventListener("click", function (e) {
  e.preventDefault();
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  if (password.getAttribute("type") === "password") btn.textContent = "Montrer";
  else btn.textContent = "Cacher";
});

btn_enregistrer.addEventListener("click", async function (e) {
  e.preventDefault();
  let checkCndt = document.querySelector("#check_box_cndt");
  let checkCnfd = document.querySelector("#check_box_cnfd");
  let newsLetter = document.querySelector("#check_box_newsletter");
  if (checkCndt.checked == false || checkCnfd.checked == false) {
    return showErrorMsg("Veiller cocher tous les champs requis");
  }
  //let panier_items = JSON.parse(localStorage.getItem("storedItems"));
  let homme = document.getElementById("homme");
  let femme = document.getElementById("femme");
  let cli_nom = document.getElementById("nom").value;
  let cli_prenom = document.getElementById("prenom").value;
  let cli_num = document.getElementById("num").value;
  let cli_mail = document.getElementById("email").value;
  let cli_pwd = document.getElementById("password").value;
  let data = {
    credentials: {
      tit_id: homme.checked ? homme.value : femme.value,
      cli_nom: cli_nom,
      cli_prenom: cli_prenom,
      cli_mail: cli_mail,
      cli_pwd: cli_pwd,
      cli_num: cli_num,
      cli_newsletter: newsLetter.checked ? true : false,
    },
    // panier_items: panier_items,
  };
  try {
    await axios.post(`${SITE_URL}/inscription`, data, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    window.location.href = `${SITE_URL}/inscription/login`;
  } catch (error) {
    showErrorMsg(error.response.data.errorMsg);
  }
});
