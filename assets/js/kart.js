/**
 * Classe répresentant le kadi
 */
class Kart {
  static items = [];

  /**
   *
   * @returns Array
   */
  static getParsedBasket() {
    return JSON.parse(localStorage.getItem("storedItems"));
  }
  /**
   *
   * @param {Array} item
   */
  static addItem(item) {
    let storedITems = JSON.parse(localStorage.getItem("storedItems"));
    let itemForPanier = {
      pro_id: item.pro_id,
      pro_libelle: item.pro_libelle,
      pad_qte: 1,
      pad_ttc: item.Tarifs[0].tar_ttc,
      pad_ht: item.Tarifs[0].tar_ht,
      media: item.Media[0].med_ressource,
    };
    if (storedITems) {
      let produitFilter = storedITems.filter(
        (produit) => produit.pro_id == item.pro_id
      );
      let produit = produitFilter[0];
      if (produitFilter.length !== 0) {
        produit.pad_qte = produit.pad_qte + 1;
        let produitPositionInArray = storedITems.findIndex(
          (produit) => produit.pro_id === item.pro_id
        );
        storedITems[produitPositionInArray] = produit;
      } else {
        storedITems.push(itemForPanier);
      }
      localStorage.setItem("storedItems", JSON.stringify(storedITems));
    } else {
      Kart.items.push(itemForPanier);
      localStorage.setItem("storedItems", JSON.stringify(Kart.items));
    }
    Kart.kartRenderItems();
    Kart.RenderModal(itemForPanier);
  }
  /**
   * Supprime un Item du panier
   * @param {Number} itemId
   */
  static removeItem(itemId) {
    let storedITems = Kart.getParsedBasket();
    let produitPositionInArray = storedITems.findIndex(
      (produit) => produit.pro_id === itemId
    );
    storedITems.splice(produitPositionInArray, 1);
    localStorage.setItem("storedItems", JSON.stringify(storedITems));
    Kart.kartRenderItems();
    Kart.RenderModal();
  }
  /**
   * Affiche les items du panier
   */
  static kartRenderItems() {
    let kartItemsElement = document.querySelector(".kart-items");
    let storedITems = Kart.getParsedBasket();
    let storedItemsHtml = ``;
    let kartProductQte = 0
    let kartProductPrice = 0
    storedITems.map((produit) => {
         kartProductQte = produit.pad_qte + kartProductQte;
         kartProductPrice = (produit.pad_qte * produit.pad_ttc) + kartProductPrice
      storedItemsHtml += `
            <div>
                <div class="kart-item">
                    <div class="kart-img">
                        <img src="/images/produits/${produit.media}" alt="">
                    </div>
                    <div class="kart-content">
                        <a href="/article/${produit.pro_id}">${produit.pro_libelle}</a>
                        <div class="actions">
                            <span class="price">${produit.pad_qte} x ${produit.pad_ttc} €</span>
                            <button class="btn-close"></button>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            `;
    });
    kartItemsElement.innerHTML = storedItemsHtml; 
    let kartInfosData = `
    <div class="kart-article">
    <div class="nbr-article">
      <span>${kartProductQte} articles</span>
    </div>
    <div class="price">
      <span>${kartProductPrice} €</span>
    </div>
  </div>

  <div class="kart-livraison">
    <div class="total">
      <span>Livraison</span>
    </div>
    <div class="price-total">
      <span>15$</span>
    </div>
  </div>

  <div class="kart-total">
    <div class="total">
      <span>Total</span>
    </div>
    <div class="price-total">
      <span>35$</span>
    </div>
  </div>
    `;
    document.querySelector("#kart-infos").innerHTML =kartInfosData ;
    document.querySelector("#kart-infos").innerHTML = kartInfosData;
    const btnRemoveProduct = document.querySelectorAll("#remove-prod");
    btnRemoveProduct.forEach((item) => {
      item.addEventListener("click", () => {
        let itemId = element.dataset.id;
        // Kart.removeItem()
        console.log(itemId);
      });
    });
  }
  /**
   *
   * @param {*} item
   */
  static RenderModal(item) {
    let storedITems = Kart.getParsedBasket();
    let html = /*html*/ `
        <div class="body-modal-detail">
            <img src="/images/produits/${item.media}" alt="" srcset="" />
            <div class="info-product">
            <h4>${item.pro_libelle}</h4>
            <div class="product-montant">7,00 €</div>
            <div class="product-quantity">Quantité : <span> ${item.pad_qte} </span></div>
            </div>
        </div>
        <div class="modal-body-commande">
            <h5>Il y a ${storedITems.length} articles dans votre panier.</h5>
            <div class="sous-total">
                <span class="sous-total-titre">Sous-total :</span>
                <span class="sous-total-montant">87,50 €</span>
            </div>
            <div class="transport">
                <span class="transport-titre">transport:</span>
                <span class="transport-montant">87,50 €</span>
            </div>
            <div class="total">
                <span class="total-titre">total:</span>
                <span class="total-montant">87,50 €</span>
            </div>
            <div class="btn-achat">
                <button class="continuer">Continuer mes achats</button>
                <a href="/panier/#page-panier" class="finaliser">
                    <i class="fa fa-check icon-succes"></i>
                    <span>Finaliser le devis</span>
                </a>
            </div>
        </div>
        `;
    document.querySelector("#myModal .body-modal").innerHTML = html;
  }
}
