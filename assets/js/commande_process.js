(()=>{
    let radios = document.querySelectorAll('[name=radio_mode_livraison]');
    radios.forEach(radio=>{
        radio.addEventListener('click',(e)=>{
            let frp_ttc = e.target.dataset.ttc;
            let frp_id = e.target.value;
            localStorage.setItem('fraisDivers',JSON.stringify({
                frais_port:parseFloat(frp_ttc),frais_dossier:15.5}))
        })
    })
})();