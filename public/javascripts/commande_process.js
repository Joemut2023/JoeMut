"use strict";

(function () {
  var radios = document.querySelectorAll('[name=radio_mode_livraison]');
  radios.forEach(function (radio) {
    radio.addEventListener('click', function (e) {
      var frp_ttc = e.target.dataset.ttc;
      var frp_id = e.target.value;
      localStorage.setItem('fraisDivers', JSON.stringify({
        frais_port: parseFloat(frp_ttc),
        frais_dossier: 15.5
      }));
    });
  });
})();