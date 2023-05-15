//const modalDevis = new bootstrap.Modal(document.querySelector('#modal-devis'), {});
//let allModalToggler = document.querySelectorAll('.td-modal-container');
//const modalDevisBody = document.querySelector('#modal-devis .modal-body');
const accordionsTriggers = document.querySelectorAll('.tr-id');

accordionsTriggers.forEach(accordionTrigger=>{
    accordionTrigger.addEventListener('click',async (e)=>{
        let id = parseInt(e.target.dataset.id);
        let panierId = parseInt(e.target.dataset.panier);
        let produits = await axios(`${SITE_URL}/admin/devis/${panierId}`);
        let accordionElt = document.querySelector(`#tr-accordion-${id}`);
        let tdBody = document.querySelector(`#tr-accordion-${id} .td-body div`);
        let tdBodyHtml =`` 
        produits.data.forEach(pad=>{
            tdBodyHtml += `
                <div class="produit-detail">
                    <p>${pad.Produit.pro_libelle}</p>
                    <p>Quantité : ${pad.pad_qte}</p>
                </div>
            `
        })
        tdBody.innerHTML = tdBodyHtml;
        accordionElt.style.display === ''? accordionElt.style.display = 'table-row':accordionElt.style.display = ''; 
       // console.log(accordionElt.style.display);
    })
});

