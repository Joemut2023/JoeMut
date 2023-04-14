const password = document.getElementById("password");
const show = document.getElementById("btn-password");
const formElt = document.querySelector('#form');

show.addEventListener("click", function (e) {
  e.preventDefault();

  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  if (password.getAttribute("type") === "password") btn.textContent = "Montrer";
  else btn.textContent = "Cacher";
});

formElt.addEventListener('submit',async (e)=>{
  e.preventDefault();
  let cli_mail = document.querySelector('[name=cli_mail]').value;
  let cli_pwd = document.querySelector('[name=cli_pwd]').value;
  let panier_items= JSON.parse(localStorage.getItem('storedItems'));
  let data = {
    credentials:{
      cli_mail,
      cli_pwd
    },
    panier_items
  }
 let panier_id = await axios.post('/connexion',data,{
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    }
  });
  console.log(panier_id);
  let panier_details = await axios.get(`/connexion/panier-details/${panier_id.data}`);

  if (panier_details.data.length > 0) {
    let panier_details_data = [];
    console.log(panier_details.data);
    panier_details.data.forEach(item => {
      panier_details_data.push({...item,media:item.Produit.Media[0].med_ressource,pro_libelle:item.Produit.pro_libelle,pro_ref:item.Produit.pro_ref,pad_ttc:item.pad_ttc});
    });
    localStorage.setItem('storedItems',JSON.stringify(panier_details_data));
    window.location.href =  `${SITE_URL}/mon-compte`;
  }
  
})
