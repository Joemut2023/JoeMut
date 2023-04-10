/**
 * Classe répresentant le kadi
 */
class Kart {
    static items = [];

    static addItem(item){
        let storedITems = JSON.parse(localStorage.getItem('storedItems'));
        let itemForPanier = {
            pro_id:item.pro_id,
            pro_libelle : item.pro_libelle,
            pad_qte:1,
            pad_ttc:item.Tarifs[0].tar_ttc,
            pad_ht:item.Tarifs[0].tar_ht,
            media:item.Media[0].med_ressource
        }    
        if(storedITems){      
            let produitFilter = storedITems.filter(produit => produit.pro_id == item.pro_id);
            let produit = produitFilter[0];
            if (produitFilter.length !== 0) {
                produit.pad_qte = produit.pad_qte + 1;
                let produitPositionInArray = storedITems.findIndex(produit => produit.pro_id === item.pro_id);
                storedITems[produitPositionInArray] = produit;
            }else{
                storedITems.push(itemForPanier);
            }
            localStorage.setItem('storedItems',JSON.stringify(storedITems));
        }else{
            Kart.items.push(itemForPanier);
            localStorage.setItem('storedItems',JSON.stringify(Kart.items));
        }
        Kart.kartRenderItems();
    }
    static kartRenderItems(){
        let kartItemsElement = document.querySelector('.kart-items');
        let storedITems = JSON.parse(localStorage.getItem('storedItems'));
        let storedItemsHtml = ``
        storedITems.map(produit=>{
            storedItemsHtml += `
            <div class="kart-item">
                <div class="kart-img">
                    <img src="/images/produits/${produit.media}" alt="">
                </div>
                <div class="kart-content">
                    <a href="/article/${produit.pro_id}">${produit.pro_libelle}</a>
                    <div class="actions">
                        <span class="price">${produit.pad_ttc}</span>
                        <button class="btn-close"></button>
                    </div>
                </div>
            </div>
            `  
        })
        kartItemsElement.innerHTML = storedItemsHtml;
    }
}