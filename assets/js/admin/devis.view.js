const btnDocFormNote = document.querySelector('.btn-form-doc-note');
const btnDocFormPaiement = document.querySelector('.btn-form-doc-paiement');
const trFormNote = document.querySelector('.tr-form-note');
const trFormPaiement = document.querySelector('.tr-form-paiement');
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

