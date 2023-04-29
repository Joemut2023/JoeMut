const modalDevis = new bootstrap.Modal(document.querySelector('#modal-devis'), {});
let allModalToggler = document.querySelectorAll('.td-modal-container');
const modalDevisBody = document.querySelector('#modal-devis .modal-body');
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
                </div>
            `
        })
        tdBody.innerHTML = tdBodyHtml;
        accordionElt.style.display === ''? accordionElt.style.display = 'table-row':accordionElt.style.display = ''; 
       // console.log(accordionElt.style.display);
    })
})
allModalToggler.forEach(modalToggler=>{
    modalToggler.addEventListener('click',async (e)=>{
        let commandeId = parseInt(e.target.dataset.commande);
        let panierId = parseInt(e.target.dataset.panier);
        let produits = await axios(`${SITE_URL}/admin/devis/${panierId}`);
        let modalDevisHtml = ``;
        await produits.data.forEach(pad=>{
            modalDevisHtml += /*html*/`
                <div class="modalDevis-item">
                    <div class="modalDevis-img">
                        <img src="/images/produits/${pad.Produit.Media[0].med_ressource}" alt=""/>
                    </div>
                    <div class="modalDevis-txt">
                        <h2>${pad.Produit.pro_libelle}</h2>
                        <p>Quantité : ${pad.pad_qte}</p>
                    </div>
                </div>
            `
        });
        modalDevisBody.innerHTML = modalDevisHtml;
        modalDevis.show();
    });
});


