const btnDocFormNote = document.querySelector('.btn-form-doc-note');
const btnDocFormPaiement = document.querySelector('.btn-form-doc-paiement');
const trFormNote = document.querySelector('.tr-form-note');
const trFormPaiement = document.querySelector('.tr-form-paiement');
const btnEditProds = document.querySelectorAll('.btn-edit-prod');

(()=>{
    var simplemde = new SimpleMDE({
        element: document.querySelector("#devis-note-textarea"),
        forceSync: true, 
        spellChecker: false,
        initialValue: "Tapez ici...",
    });
})();
btnDocFormNote.addEventListener('click',(e)=>{
    trFormNote.style.display === ''?trFormNote.style.display='table-row':trFormNote.style.display='';
})
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


