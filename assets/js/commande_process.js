(()=>{
    let radios = document.querySelectorAll('[name=radio_mode_livraison]');
    let radios_adresses = document.querySelectorAll('[name=radio_adresse]');
    let form_finalisation = document.querySelector('.finalisation-content form');
    radios?.forEach(radio=>{
        radio.addEventListener('click',(e)=>{
            let frp_ttc = e.target.dataset.ttc;
            let frp_id = e.target.value;
            localStorage.setItem('fraisDivers',JSON.stringify({
                frais_port:parseFloat(frp_ttc),frais_dossier:15.5}))
        })
    });
    radios_adresses?.forEach(radio=>{
        radio.addEventListener('click',(e)=>{
            console.log(e.target);
        })
    });
    form_finalisation.addEventListener('submit',async (e)=>{
        e.preventDefault();
        let panier_details = JSON.parse(localStorage.getItem('storedItems'));
        let frais = JSON.parse(localStorage.getItem('fraisDivers'));
        let panier = await axios.post('/panier',{
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            }
        });
    });

})();