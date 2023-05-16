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
        const loop = (async callback=>{
            await produits.data.forEach(async pad=>{
                var stockInit = 0;
                var stockDispo = 0;
                let stockSortie = await axios.get(`${SITE_URL}/admin/devis/total-produit-en-sortie/${pad.Produit.pro_id}`);
                
                pad.Produit.Quantites.forEach(qte=>{
                    stockInit += qte.qua_nbre 
                });
                stockDispo = stockInit - stockSortie.data;
                tdBodyHtml += `
                    <div class="produit-detail">
                        <p class="title">${pad.Produit.pro_libelle}</p>
                        <p>Quantité : ${pad.pad_qte}</p>
                        <p>Stock initial: ${stockInit} </p>
                        <p>Stock Disponible: ${stockDispo}</p>
                    </div>
                `
                //tdBody.insertAdjacentHTML("afterend",tdBodyHtml);
                callback(tdBodyHtml);
            })
        })
        loop((html)=>{
        tdBody.innerHTML = html;
       })
        accordionElt.style.display === ''? accordionElt.style.display = 'table-row':accordionElt.style.display = ''; 
    })
});

