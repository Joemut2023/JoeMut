
const btn_delete = document.querySelectorAll(".btn-delete");

btn_delete.forEach(item => {
  item.addEventListener("click",async function(){
    // e.preventDefault();
    //    const produit = await axios.delete(
    //      `${SITE_URL}/admin/produits/${item.id}`,
    //      {
    //        headers: {
    //          "X-Requested-With": "XMLHttpRequest",
    //        },
    //      }
    //    );
    //    console.log(produit)
  })
});