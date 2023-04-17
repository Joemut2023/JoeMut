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
   * @returns Array
   */
  static getParsedFrais() {
    return JSON.parse(localStorage.getItem("fraisDivers"));
  }

  /**
   * recuperer le nombre d'artcile au panier
   * @returns Numeric
   */
  static getItemNumber() {
    let storedITems = Kart.getParsedBasket();
    let quantity = 0;
    storedITems?.forEach((element) => {
      quantity += element.pad_qte;
    });
    return quantity;
  }

  /**
   *
   * @param {Array} item
   */

  static async addFraisDivers() {
    let oldFraisDossier = Kart.getParsedFrais();
    if (oldFraisDossier == null) {
      let fraisPort = await axios.get(`${SITE_URL}/fraisPort`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      let fraisDossier = await axios.get(`${SITE_URL}/fraisDossier`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });

      let fraisDivers = {
        frais_port: fraisPort.data.frp_ttc,
        frais_dossier: fraisDossier.data.auf_ttc,
      };
      localStorage.setItem("fraisDivers", JSON.stringify(fraisDivers));
    }
  }

  static async addItem(item, qte = null) {
    let storedITems = JSON.parse(localStorage.getItem("storedItems"));
    let itemForPanier = {
      pro_id: item.pro_id,
      pro_libelle: item.pro_libelle,
      pad_qte: qte ? parseInt(qte) : 1,
      pad_ttc: item.Tarifs[0].tar_ttc,
      pad_ht: item.Tarifs[0].tar_ht,
      media: item.Media[0].med_ressource,
      pro_ref: item.pro_ref,
    };

    if (storedITems) {
      let produitFilter = storedITems.filter(
        (produit) => produit.pro_id == item.pro_id
      );
      let produit = produitFilter[0];
      if (produitFilter.length !== 0) {
        produit.pad_qte = produit.pad_qte + itemForPanier.pad_qte;
        let produitPositionInArray = storedITems.findIndex(
          (produit) => produit.pro_id === item.pro_id
        );
        storedITems[produitPositionInArray] = produit;
      } else {
        storedITems.push(itemForPanier);
      }
      localStorage.setItem("storedItems", JSON.stringify(storedITems));
      document.querySelector("#cart-item-count").innerHTML =
        Kart.getItemNumber();
    } else {
      Kart.items.push(itemForPanier);
      localStorage.setItem("storedItems", JSON.stringify(Kart.items));
      document.querySelector("#cart-item-count").innerHTML =
        Kart.getItemNumber();
    }

    //si le client "est connecté"
    const panier = await axios.post(`${SITE_URL}/panierDetail`, {
      pro_id: item.pro_id,
      pad_qte: 1,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    console.log(panier.status, panier);

    //
    Kart.RenderModal(itemForPanier);
  }
  /**
   * Supprime un Item du panier
   * @param {Number} itemId
   */
  static async removeItem(itemId) {
    let storedITems = Kart.getParsedBasket();
    document.querySelector("#cart-item-count").innerHTML = Kart.getItemNumber();
    let produitPositionInArray = storedITems.findIndex(
      (produit) => produit.pro_id == itemId
    );
    storedITems.splice(produitPositionInArray, 1);
    localStorage.setItem("storedItems", JSON.stringify(storedITems));

    // si le user est connecté
    console.log(itemId);
    const panier = await axios.delete(`${SITE_URL}/panierDetail`, {
      pro_id: itemId,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    console.log(panier);
    Kart.kartRenderItems();
  }

  /**
   * Mettre à jour la quantité d'un item du panier
   * @param {Number} itemId
   */
  static updateItemQuantity(itemId, action) {
    storedITems = Kart.getParsedBasket();
    let produitPositionInArray = storedITems.findIndex(
      (produit) => produit.pro_id == itemId
    );
    action
      ? (storedITems[produitPositionInArray].pad_qte += 1)
      : (storedITems[produitPositionInArray].pad_qte -= 1);
    localStorage.setItem("storedItems", JSON.stringify(storedITems));
  }

  /**
   * Calculer les prix des artciles dans le panier
   */
  static calculTotalPrice() {
    let fraisDivers = JSON.parse(localStorage.getItem("fraisDivers"));
    let storedITems = Kart.getParsedBasket();
    let fraisDossier = parseFloat(fraisDivers.frais_dossier);
    let fraisPort = parseFloat(fraisDivers.frais_port);
    let kartProductPrice = 0;
    let totalPrice = 0;

    storedITems.forEach((produit) => {
      kartProductPrice = kartProductPrice + produit.pad_qte * produit.pad_ttc;
      totalPrice = kartProductPrice + fraisDossier + fraisPort;
    });
    return { totalPrice, kartProductPrice };
  }

  /**
   * Affiche les items du panier
   */
  static kartRenderItems() {
    let kartItemsElement = document.querySelector(".kart-items");
    const fraisDivers = JSON.parse(localStorage.getItem("fraisDivers"));
    const fraisDossier = parseFloat(fraisDivers.frais_dossier);
    const fraisPort = parseFloat(fraisDivers.frais_port);
    let storedITems = Kart.getParsedBasket();
    let storedItemsHtml = ``;
    let kartProductQte = 0;
    storedITems?.map((produit) => {
      kartProductQte = produit.pad_qte + kartProductQte;

      storedItemsHtml += `
            <div>
                <div class="kart-item">
                    <div class="kart-img">
                        <img src="/images/produits/${produit.media}" alt="">
                    </div>
                    <div class="kart-content">
                        <a href="/article/${produit.pro_id}">${
        produit.pro_libelle
      }</a>
                        <div class="actions">
                            <span class="price">${
                              produit.pad_qte
                            } x ${produit.pad_ttc.toFixed(2)} €</span>
                            <button id="remove-prod" data-id="${
                              produit.pro_id
                            }" class="btn-close"></button>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            `;
    });
    kartItemsElement.innerHTML = storedItemsHtml;
    let kartInfosData = `
    <div>
    <p id="par-empty-data">Aucun produit dans le chariot.</p>
      <div class="kart-article">
        <div class="nbr-article">
          <span>${kartProductQte} articles</span>
        </div>
        <div class="price">
          <span>${Kart.calculTotalPrice().kartProductPrice.toFixed(2)} €</span>
        </div>
      </div>

      <div class="kart-livraison">
        <div class="total">
          <span>Livraison</span>
        </div>
        <div class="price-total">
        <span>${parseFloat(fraisPort).toFixed(2)} €</span> 
        </div>
      </div>
      <div class="kart-livraison">
      <div class="total">
        <span>Frais dossier</span>
      </div>
      <div class="price-total">
        <span>${parseFloat(fraisDossier).toFixed(2)} €</span>
      </div>
    </div>

      <div class="kart-total">
        <div class="total">
          <span>Total</span>
        </div>
        <div class="price-total">
          <span>${Kart.calculTotalPrice().totalPrice.toFixed(2)} €</span>
        </div>
      </div>
      <hr>
      <div class="kart-btns">
      <a href="/panier/#page-panier" class="btn-voirpanier">
        <button>
          Voir le <br />
          panier
        </button>
      </a>
      <a href="/commander/#page-commander" class="btn-commander">
        <button>Commander</button>
      </a>
    </div>
    </div>
    `;
    document.querySelector("#kart-infos").innerHTML = kartInfosData;
    // storedITems.length != 0
    //   ? (document.querySelector("#par-empty-data").style.display = "block")
    //   : null;
    const btnRemoveProduct = document.querySelectorAll("#remove-prod");
    btnRemoveProduct.forEach((item) => {
      item.addEventListener("click", () => {
        let itemId = item.dataset.id;
        Kart.removeItem(itemId);
        document.querySelector("#cart-item-count").innerHTML =
          Kart.getItemNumber();
      });
    });
  }
  /**
   *
   * @param {*} item
   */
  static RenderModal(item) {
    let storedITems = Kart.getParsedBasket();
    let fraisDivers = JSON.parse(localStorage.getItem("fraisDivers"));
    let fraisDossier = parseFloat(fraisDivers.frais_dossier);
    let fraisPort = parseFloat(fraisDivers.frais_port);
    let produitFilter = storedITems.filter(
      (produit) => produit.pro_id == item.pro_id
    );
    let html = /*html*/ `
        <div class="body-modal-detail">
            <img src="/images/produits/${item.media}" alt="" srcset="" />
            <div class="info-product">
            <h4>${item.pro_libelle}</h4>
            <div class="product-montant">${item.pad_ttc.toFixed(2)}€</div>
            <div class="product-quantity">Quantité : <span> ${
              produitFilter[0].pad_qte
            } </span></div>
            </div>
        </div>
        <div class="modal-body-commande">
            <h5>Il y a ${Kart.getItemNumber()} articles dans votre panier.</h5>
            <div class="sous-total">
                <span class="sous-total-titre">Sous-total :</span>
                <span class="sous-total-montant">${Kart.calculTotalPrice().kartProductPrice.toFixed(
                  2
                )} €</span>
            </div>
            <div class="transport">
                <span class="transport-titre">transport:</span>
                <span class="transport-montant">${fraisPort.toFixed(2)} €</span>
            </div>
            <div class="transport">
                <span class="transport-titre">frais dossier:</span>
                <span class="transport-montant">${fraisDossier.toFixed(
                  2
                )} €</span>
            </div>
            <div class="total">
                <span class="total-titre">total:</span>
                <span class="total-montant">${Kart.calculTotalPrice().totalPrice.toFixed(
                  2
                )} €</span>
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
