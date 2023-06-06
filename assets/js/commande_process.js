(()=>{
    let radios = document.querySelectorAll('[name=radio_mode_livraison]');
    let radios_adresses = document.querySelectorAll('[name=radio_adresse]');
    let form_finalisation = document.querySelector('.finalisation-content form');
    let livraison_form_el = document.querySelector('#livraison-form form');
    let formLogin = document.querySelector('#form-commande-login');    
    localStorage.setItem('fraisDivers',JSON.stringify({frais_port:parseFloat("13.10"),frais_dossier:parseFloat("15.5"),frp_id:"1"}));
    
    formLogin?.addEventListener('submit',async (e)=>{
        e.preventDefault(); 
        await login_process('commander/#page-commander');
    })
    radios?.forEach(radio=>{
        radio.addEventListener('click',(e)=>{
            let frp_ttc = e.target.dataset.ttc;
            //console.log(document.querySelector('[name=radio_adresse_livraison]:checked').value);
            let frp_id = e.target.value;
            localStorage.setItem('fraisDivers',JSON.stringify({
                frais_port:parseFloat(frp_ttc).toFixed(2),frais_dossier:15.5,frp_id:frp_id}))
        })
    });
    // radios_adresses?.forEach(radio=>{
    //     radio.addEventListener('click',(e)=>{
    //         console.log(e.target);
    //     })
    // });
    form_finalisation.addEventListener('submit',async (e)=>{
        e.preventDefault();
        let btn_finaliser_devis = document.getElementById('btn_finaliser_devis');
        btn_finaliser_devis.removeAttribute("disabled");
        btn_finaliser_devis.setAttribute("disabled","true");
        btn_finaliser_devis.style.backgroundColor = "#eee";
        btn_finaliser_devis.style.cursor = "not-allowed";
        let commande_debut = document.querySelector('[name=com_debut_spectacle]').value;
        let com_fin_spectacle = document.querySelector('[name=com_fin_spectacle]').value;
        let com_date_essayage = document.querySelector('[name=com_date_essayage]').value;
        let com_date_essayage_autre = document.querySelector('[name=com_autre_date]').value;
       // let com_compl = document.querySelector('[name=com_compl]').value;
       // let panier_details = JSON.parse(localStorage.getItem('storedItems'));
        let frais = JSON.parse(localStorage.getItem('fraisDivers'));
        let adresse = document.querySelector('[name=radio_adresse]:checked').value;
        let adresse_livraison = document.querySelector('[name=radio_adresse_livraison]:checked').value;
        let dates_essayages = [com_date_essayage,com_date_essayage_autre]
        let code_promo = document.querySelector(".code_promo").value;
        let params = {
            frais:frais,
            commande:{
                commande_debut,
                com_fin_spectacle,
                com_date_essayage,
                com_date_essayage_autre,
              //  com_compl
            },
            adresse:adresse,
            adresse_livraison:adresse_livraison,
            essayages:dates_essayages,
            prm_code:code_promo
        }
        try {
            let panier = await axios.post('/commander',params,{
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                },
            });
            if (panier.data != false) {
                localStorage.setItem('storedItems',JSON.stringify([]));
                window.location.replace('/confirmation-commande') 
            }else{
                window.location.replace('/');
            }
        } catch (error) {
            console.log(error);
        }
        
    });
})();