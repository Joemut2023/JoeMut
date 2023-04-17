(()=>{
    let radios = document.querySelectorAll('[name=radio_mode_livraison]');
    let radios_adresses = document.querySelectorAll('[name=radio_adresse]');
    let form_finalisation = document.querySelector('.finalisation-content form');
    let livraison_form_el = document.querySelector('#livraison-form form');
    let formLogin = document.querySelector('#form-commande-login');    

    formLogin?.addEventListener('submit',async (e)=>{
        e.preventDefault();
        await login_process('commander/#page-commander');
    })
    radios?.forEach(radio=>{
        radio.addEventListener('click',(e)=>{
            let frp_ttc = e.target.dataset.ttc;
            let frp_id = e.target.value;
            localStorage.setItem('fraisDivers',JSON.stringify({
                frais_port:parseFloat(frp_ttc),frais_dossier:15.5,frp_id:frp_id}))
        })
    });
    radios_adresses?.forEach(radio=>{
        radio.addEventListener('click',(e)=>{
            console.log(e.target);
        })
    });
    form_finalisation.addEventListener('submit',async (e)=>{
        e.preventDefault();
        let commande_debut = document.querySelector('[name=com_debut_spectacle]').value;
        let com_fin_spectacle = document.querySelector('[name=com_fin_spectacle]').value;
        let com_date_essayage = document.querySelector('[name=com_date_essayage]').value;
        let com_date_essayage_autre = document.querySelector('[name=com_autre_date]').value;
        let com_compl = document.querySelector('[name=com_compl]').value;
       // let panier_details = JSON.parse(localStorage.getItem('storedItems'));
        let frais = JSON.parse(localStorage.getItem('fraisDivers'));
        let adresse = document.querySelector('[name=radio_adresse]').value;
        let params = {
            //items : panier_details,
            frais:frais,
            commande:{
                commande_debut,
                com_fin_spectacle,
                com_date_essayage,
                com_date_essayage_autre,
                com_compl
            },
            adresse:adresse
        }
        let panier = await axios.post('/commander',params,{
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
        });
        localStorage.setItem('storedItems',JSON.stringify([]));
        window.location.replace('/confirmation-commande')
    });
})();