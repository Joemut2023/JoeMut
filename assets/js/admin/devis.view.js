const btnDocFormNote = document.querySelector('.btn-form-doc-note');
const btnDocFormPaiement = document.querySelector('.btn-form-doc-paiement');
const trFormNote = document.querySelector('.tr-form-note');
const trFormPaiement = document.querySelector('.tr-form-paiement');
const btnEditProds = document.querySelectorAll('.btn-edit-prod');
const btnUpdateExistAdresseFacturation = document.querySelector('.btn-update-exist-adresse-facturation');
const btnUpdateExistAdresseLivraison = document.querySelector('.btn-update-exist-adresse-livraison');
const modalUpdateAdressFacturationEl = document.querySelector('#modal-update-adresse-facturation');
const modalUpdateAdressFacturationElForm = document.querySelector('#modal-update-adresse-facturation .modal-dialog .modal-content .modal-content-form');
const modalUpdateAdressLivraisonEl = document.querySelector('#modal-update-adresse-livraion');
const modalUpdateAdressLivraisonElForm = document.querySelector('#modal-update-adresse-livraion .modal-dialog .modal-content .modal-content-form');
const modalUpdateAdressFacturation = new bootstrap.Modal(modalUpdateAdressFacturationEl);
const modalUpdateAdressLivraison = new bootstrap.Modal(modalUpdateAdressLivraisonEl);

//simple MDE
(()=>{
    var simplemde = new SimpleMDE({
        element: document.querySelector("#devis-note-textarea"),
        forceSync: true, 
        spellChecker: false,
        initialValue: "Tapez ici...",
    });
})();

/**
 * Affichage du formulaire de note de commande => Tabs (Documents)
 */
btnDocFormNote.addEventListener('click',(e)=>{
    trFormNote.style.display === ''?trFormNote.style.display='table-row':trFormNote.style.display='';
})
/**
 * Affichage du formulaire de note de paiement => Tabs (Documents)
 */
btnDocFormPaiement.addEventListener('click',(e)=>{
    trFormPaiement.style.display === ''?trFormPaiement.style.display='table-row':trFormPaiement.style.display='';
})
btnEditProds.forEach(btnEditProd=>{
    btnEditProd.addEventListener('click',(e)=>{
        let padId = e.target.dataset.pad;
        const trFormEditPro = document.querySelector(`.tr-form-edit-prod-${padId}`);
        console.log(`.tr-form-edit-prod-${padId}`,padId);
        trFormEditPro.style.display === ''?trFormEditPro.style.display='table-row':trFormEditPro.style.display='';
    })
},true)

// adresse 
/**
 * formulaire modification adresse de facturation existante 
 */
btnUpdateExistAdresseFacturation.addEventListener('click',async(e)=>{
    let commandeId = e.target.dataset.commande
    let adresseId = e.target.dataset.adresse
    let adresse = await axios.get('/admin/adresse/byAjax/'+adresseId);
   // console.log(modalUpdateAdressFacturationElForm,adresse);
    modalUpdateAdressFacturation.show();
    showModalUpdateAdresse(modalUpdateAdressFacturationElForm,adresse,commandeId);
})
btnUpdateExistAdresseLivraison.addEventListener('click',async(e)=>{
    let commandeId = e.target.dataset.commande
    let adresseId = e.target.dataset.adresse
    let adresse = await axios.get('/admin/adresse/byAjax/'+adresseId);
    modalUpdateAdressLivraison.show();
    console.log(adresse);
    showModalUpdateAdresse(modalUpdateAdressLivraisonElForm,adresse,commandeId);
})

const showModalUpdateAdresse = (modal,adresse,commandeId)=>{
    modal.innerHTML = /*html*/`
    <form action="/admin/adresse/update-from-commande" method="post">
        <div class="mb-3">
            <label class="form-label" for=""> Nom de la structure</label>
            <input class="form-control" placeholder="" type="text" name="adr_structure" required value="${adresse.data.adr_structure}"/>
        </div>
        <div class="mb-3">
            <label class="form-label" for=""><span>* </span>Nom</label>
            <input class="form-control" placeholder="Romain" type="text" name="adr_nom" id="" value="${adresse.data.adr_nom}" />
        </div>
        <div class="mb-3">
            <label class="form-label" for=""> <span>* </span>Prenom</label>
            <input class="form-control" placeholder="Romain" type="text" name="adr_prenom" id="" value="${adresse.data.adr_prenom}" />
        </div>
        <div class="mb-3">
            <label class="form-label" for=""> Société</label>
            <input class="form-control" placeholder="" type="text" name="adr_societe" id="" required value="${adresse.data.adr_societe}"/>
        </div>
        <div class="mb-3">
            <label class="form-label" for=""> Numéro de TVA</label>
            <input class="form-control" placeholder="" type="text" name="adr_num_tva" id="" value="${adresse.data.adr_num_tva}"/>
        </div>
        <div class="mb-3">
            <label class="form-label" for=""> <span>* </span>Adresse</label>
            <input class="form-control" placeholder="" type="text" name="adr_adresse" id="" value="${adresse.data.adr_adresse}"/>
        </div>
        <div class="mb-3">
            <label class="form-label" for=""> Complément d'adresse</label>
            <input class="form-control" placeholder="" type="text" name="adr_comp" id="" value="${adresse.data.adr_comp}"/>
        </div>
        <div class="mb-3">
            <label class="form-label" for=""> <span>* </span>Code postal</label>
            <input class="form-control" placeholder="" type="text" name="adr_cp" id="" value="${adresse.data.adr_cp}"/>
        </div>
        <div class="mb-3">
            <label class="form-label" for=""> <span>* </span>Ville</label>
            <input class="form-control" placeholder="" type="text" name="adr_ville" id="" value="${adresse.data.adr_ville}"/>
        </div>
        <div class="mb-3">
            <label class="form-label" for=""> <span>* </span>Pays</label>
            <input class="form-control" placeholder="" type="text" name="adr_pays" id="" value="${adresse.data.adr_pays}"/>
        </div>
        <div class="mb-3">
            <input type="hidden" name="com_id" value="${commandeId}">
            <input type="hidden" name="adr_id" value="${adresse.data.adr_id}">
            <button class="btn btn-primary" type="submit">Enregistrer</button>
        </div>
    </form>
    `
}


