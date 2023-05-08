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
const btnShowAddPanierDetailForm = document.querySelector('.btn-add-panier-detail');
const btnDisableAddPanierDetailForm = document.querySelector('.btn-disable-add-panier-detail');
const addPanierDetailForm = document.querySelector('.form-add-panier-detail-container');
const addPanierDetailInputLibelle = document.querySelector('.add-panier-detail-input-name');
//const produitdatalistOptions = document.querySelector('#produitdatalistOptions');
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
    },true)
})

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

btnShowAddPanierDetailForm.addEventListener('click',(e)=>{
    addPanierDetailForm.style.display = 'block' 
});
btnDisableAddPanierDetailForm.addEventListener('click',(e)=>{
    e.preventDefault();
    addPanierDetailForm.style.display = 'none';
});

// addPanierDetailInputLibelle.addEventListener('keydown',async (e)=>{
//     var eventSource = e.key ? 'input':'list';
//    console.log(e.key);
//     if (e.target.value.toString() !== '') {
//         let produits = await axios.get(`${SITE_URL}/admin/produits/autocomplete-search/${e.target.value.toString()}`)
//         //produitdatalistOptions
//         console.log(produits.data);
//         var datalistOptions = ``;
//         produits.data.map(produit=>{
//             datalistOptions += `<option data-id="${produit.pro_id}" value="${produit.pro_libelle}">`
//         });
//         produitdatalistOptions.innerHTML = datalistOptions;
//     }
// })
// addPanierDetailInputLibelle.addEventListener('input',(e)=>{
//     let value = e.target.value;
//     let pro_id = e.target.dataset.id;
//     if (typeof eventSource != 'undefined' && eventSource === 'list') {
//         console.log(pro_id);
//         console.log('CLICKED! ',value,pro_id);
//     }
// })
(async()=>{
   
let produits = await axios.get(`${SITE_URL}/admin/produits/allbyJson`);

function autocomplete(inp, arr) {
    var currentFocus;
  
    inp.addEventListener("input", function (e) {
      var a,
        b,
        i,
        val = this.value;
  
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
  
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
  
      this.parentNode.appendChild(a);
  
      arr.forEach(produit=>{
        if (produit.pro_libelle.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
    
            b.innerHTML = "<strong>" + produit.pro_libelle.substr(0, val.length) + "</strong>";
            b.innerHTML += produit.pro_libelle.substr(val.length);
    
            b.innerHTML += "<input type='hidden' data-produit='"+produit.pro_id+"' value='" + produit.pro_libelle + "'>";
    
            b.addEventListener("click", function (e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              inp.dataset.produit = produit.pro_id;
              document.querySelector('.hidden-input-pro-id-add-panier_detail').value = produit.pro_id;
              closeAllLists();
            });
            a.appendChild(b);
          }
      })

    });
  
    inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
  
        addActive(x);
      } else if (e.keyCode == 38) {
        currentFocus--;
  
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      if (!x) return false;
  
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = x.length - 1;
  
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
}
autocomplete(document.getElementById("myInput"), produits.data);
})();
