
const statut = document.querySelectorAll(".pro-statut");
const links = document.querySelectorAll(".page-link");

statut.forEach((element) => {
  element.addEventListener("change", async function(){
    const pro_statut = element.checked ? true : false;
     const Myproduct = await await axios.get(
       `${SITE_URL}/admin/produits/one/${element.name}`,
       {
         headers: {
           "X-Requested-With": "XMLHttpRequest",
         },
       }
     );
     const produit = await axios.put(
       `${SITE_URL}/admin/produits/${Myproduct.data.pro_id}`,
       { pro_statut },
       {
         headers: {
           "X-Requested-With": "XMLHttpRequest",
         },
       }
     );
     window.location.reload();
  })
});

links.forEach(element => {
  element.addEventListener("click",function(){
  
    element.classList.add("active");
  })
});

