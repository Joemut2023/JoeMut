"use strict";

var btnDocFormNote = document.querySelector('.btn-form-doc-note');
var btnDocFormPaiement = document.querySelector('.btn-form-doc-paiement');
var trFormNote = document.querySelector('.tr-form-note');
var trFormPaiement = document.querySelector('.tr-form-paiement');
(function () {
  var simplemde = new SimpleMDE({
    element: document.querySelector("#devis-note-textarea"),
    forceSync: true,
    spellChecker: false,
    initialValue: "Tapez ici..."
  });
})();
btnDocFormNote.addEventListener('click', function (e) {
  trFormNote.style.display === '' ? trFormNote.style.display = 'table-row' : trFormNote.style.display = '';
});
btnDocFormPaiement.addEventListener('click', function (e) {
  trFormPaiement.style.display === '' ? trFormPaiement.style.display = 'table-row' : trFormPaiement.style.display = '';
});