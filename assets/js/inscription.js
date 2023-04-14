const password = document.getElementById("password");
const btn = document.getElementById("btn-action");
const btn_enregistrer = document.getElementById("enregister");

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

  let panier_items = localStorage.getItem("storedItems");
  let homme = document.getElementById("homme");
  let femme = document.getElementById("femme");
  let cli_nom = document.getElementById("nom").value;
  let cli_prenom = document.getElementById("prenom").value;
  let cli_mail = document.getElementById("email").value;
  let cli_pwd = document.getElementById("password").value;
  let data = {
    tit_id: homme.checked ? homme.value : femme.value,
    cli_nom: cli_nom,
    cli_prenom: cli_prenom,
    cli_mail: cli_mail,
    cli_pwd: cli_pwd,
    panier_items: panier_items,
  };
  await axios.post(`${SITE_URL}/inscription`, data, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  window.location.href = `${SITE_URL}/mon-compte`
});
