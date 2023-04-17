const login_process = async(view)=>{
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
  let panier_details = await axios.get(`/connexion/panier-details/${panier_id.data}`);
  panier_id = panier_id.data;
  if (panier_details.data.length > 0) {
    let panier_details_data = [];
    panier_details.data.forEach(item => {
      panier_details_data.push({...item,media:item.Produit.Media[0].med_ressource,pro_libelle:item.Produit.pro_libelle,pro_ref:item.Produit.pro_ref,pad_ttc:item.pad_ttc});
    });
    localStorage.setItem('storedItems',JSON.stringify(panier_details_data));
    if (window.location.href == `${SITE_URL}/${view}`) {
    window.location.replace(`${SITE_URL}/${view}`);
    window.location.reload();
   }else{
    window.location.replace(`${SITE_URL}/${view}`);
   }
  }else{
    localStorage.setItem('storedItems',JSON.stringify([]));
    if (window.location.href == `${SITE_URL}/${view}`) {
    window.location.replace(`${SITE_URL}/${view}`);
    window.location.reload();
   }else{
    window.location.replace(`${SITE_URL}/${view}`);
   }
  }
}