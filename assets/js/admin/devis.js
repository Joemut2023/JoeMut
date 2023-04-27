const modalDevis = new bootstrap.Modal(document.querySelector('#modal-devis'), {});
let allModalToggler = document.querySelectorAll('.td-modal-container');
const modalDevisBody = document.querySelector('#modal-devis .modal-body');

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
})
