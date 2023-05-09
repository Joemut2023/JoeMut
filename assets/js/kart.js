/**
 * Classe répresentant le kadi
 */
class Kart {
  static items = [];

  /**
   *
   * @returns Array
   */
  // static getParsedBasket() {
  //   return JSON.parse(localStorage.getItem("storedItems"));
  // }
  /**
   *
   * @returns Array of all product in panierDetails
   */
  static async getAllPanierDetails() {
    const panier = await axios.get(`${SITE_URL}/panierDetail`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    return panier.data;
  }
  /**
   * recuperer le statut du client
   * @returns userId or false
   */
  static async getUserStatut() {
    try {
      const userStatut = await axios.get(`${SITE_URL}/connexion/userStatut`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      return userStatut.data;
    } catch (error) {}
  }
  /**
   *
   * @returns Object
   */
  static async getParsedFrais() {
    return JSON.parse(localStorage.getItem("fraisDivers"));
  }

  /**
   * recuperer le nombre d'artcile au panier
   * @returns Numeric
   */
  static async getItemNumber() {
    const userStatut = await Kart.getUserStatut();
    let quantity = 0;
    let storedITems = await Kart.getAllPanierDetails();
    if (userStatut == false || storedITems.length == 0) return quantity;
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
    return fraisDivers;
  }

  static async addCodePromo(pro_code) {
    try {
      axios.post(`${SITE_URL/}`);
    } catch (error) {}
  }

  static async addItem(item, qte = null) {
    const userStatut = await Kart.getUserStatut();
    if (userStatut == false)
      return (window.location.href = `${SITE_URL}/connexion/#page-connexion`);
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
    try {
      axios
        .post(`${SITE_URL}/panierDetail`, {
          pro_id: item.pro_id,
          pad_qte: itemForPanier.pad_qte,
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
        })
        .then(async (res) => {
          //console.log(res.data);
          const myModal = document.querySelector("#myModal");
          myModal.style.display = "flex";

          if (res.data == "indisponible") {
            return Kart.RenderMaxQteModal();
          } else {
            let qte = res.data.panierDetail.pad_qte;
            await Kart.RenderModal(itemForPanier, itemForPanier.pad_qte);
          }

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
              await Kart.getItemNumber();
          } else {
            Kart.items.push(itemForPanier);
            localStorage.setItem("storedItems", JSON.stringify(Kart.items));
            document.querySelector("#cart-item-count").innerHTML =
              await Kart.getItemNumber();
          }
        });
    } catch (error) {
      await Kart.RenderModal(itemForPanier, qte);
    }
  }
  /**
   * Supprime un Item du panier
   * @param {Number} itemId
   */
  static async removeItem(itemId) {
    const userStatut = await Kart.getUserStatut();
    if (userStatut == false)
      return (window.location.href = `${SITE_URL}/connexion/#page-connexion`);
    let kartLoader = document.querySelector(".kart-loader");
    const pro_id = parseInt(itemId);
    Kart.RenderDeleteModal();
    axios
      .delete(`${SITE_URL}/panierDetail`, {
        data: {
          pro_id,
        },
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
      .then(async (res) => {
        document.querySelector("#cart-item-count").innerHTML =
          await Kart.getItemNumber();
        Kart.HideDeleteModal();
        kartLoader.style.display = res.data ? "none" : "block";

        await Kart.kartRenderItems();
      });
    // let storedITems = Kart.getParsedBasket();
    // if (storedITems.length > 0) {
    //   let produitPositionInArray = storedITems.findIndex(
    //     (produit) => produit.pro_id == itemId
    //   );
    //   storedITems.splice(produitPositionInArray, 1);
    //   localStorage.setItem("storedItems", JSON.stringify(storedITems));
    // }
  }

  /**
   * Mettre à jour la quantité d'un item du panier
   * @param {Number} itemId
   */
  static async updateItemQuantity(itemId, action) {
    const panierDetail = await axios.put(`${SITE_URL}/panierDetail`, {
      pro_id: itemId,
      action: action,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    // storedITems = Kart.getParsedBasket();
    // let produitPositionInArray = storedITems.findIndex(
    //   (produit) => produit.pro_id == itemId
    // );
    // action
    //   ? (storedITems[produitPositionInArray].pad_qte += 1)
    //   : (storedITems[produitPositionInArray].pad_qte -= 1);
    // localStorage.setItem("storedItems", JSON.stringify(storedITems));
    return panierDetail.data.pad_qte;
  }

  /**
   * Calculer les prix des artciles dans le panier
   */
  static async calculTotalPrice() {
    let fraisDivers = await Kart.addFraisDivers();
    let storedITems = await Kart.getAllPanierDetails();
    let fraisDossier = parseFloat(fraisDivers.frais_dossier);
    let fraisPort = parseFloat(fraisDivers.frais_port);
    let kartProductPrice = 0;
    let totalPrice = 0;

    storedITems?.forEach((produit) => {
      kartProductPrice = kartProductPrice + produit.pad_qte * produit.pad_ttc;
      totalPrice = kartProductPrice + fraisDossier + fraisPort;
    });
    return { totalPrice, kartProductPrice };
  }

  /**
   * Affiche les items du panier
   */
  static async kartRenderItems() {
    const userStatut = await Kart.getUserStatut();
    if (userStatut == false) {
      return (window.location.href = `${SITE_URL}/connexion/#page-connexion`);
    }

    let kartItemsElement = document.querySelector(".kart-items");
    let kartLoader = document.querySelector(".kart-loader");
    const fraisDivers = await Kart.addFraisDivers();
    const price = await Kart.calculTotalPrice();
    const fraisDossier = new Decimal(parseFloat(fraisDivers.frais_dossier));
    const fraisPort = new Decimal(parseFloat(fraisDivers.frais_port));
    let panierDetail = await Kart.getAllPanierDetails();
    let storedItemsHtml = ``;
    let kartProductQte = 0;
    // console.log(fraisDoss.toString(),fraisPrt.toString());
    if (panierDetail.length !== 0) {
      panierDetail?.map((produit) => {
        kartProductQte = produit.pad_qte + kartProductQte;
        storedItemsHtml += `
              <div>
                  <div class="kart-item">
                      <div class="kart-img">
                          <img src="/images/produits/${
                            produit.Produit.Media[0].med_ressource
                          }" alt="">
                      </div>
                      <div class="kart-content">
                          <a href="/article/${produit.pro_id}">${
          produit.Produit.pro_libelle
        }</a>
                          <div class="actions">
                              <span class="price">${
                                produit.pad_qte
                              } x ${new Decimal(
          produit.pad_ttc
        ).toString()} €</span>
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
      kartLoader.style.display = kartItemsElement.innerHTML ? "none" : "block";
      kartItemsElement.innerHTML = storedItemsHtml;
    } else {
      kartItemsElement.innerHTML = ``;
      kartLoader.style.display = "none";
    }

    let kartInfosData = `
    <div>
    <p id="par-empty-data">Aucun produit dans le chariot.</p>
      <div class="kart-article">
        <div class="nbr-article">
          <span>${kartProductQte} articles</span>
        </div>
        <div class="price">
          <span>${new Decimal(price.kartProductPrice).toString()} €</span>
        </div>
      </div>

      <div class="kart-livraison">
        <div class="total">
          <span>Livraison</span>
        </div>
        <div class="price-total">
        <span>${new Decimal(fraisPort).toString()} €</span> 
        </div>
      </div>
      <div class="kart-livraison">
      <div class="total">
        <span>Frais dossier</span>
      </div>
      <div class="price-total">
        <span>${new Decimal(fraisDossier).toString()} €</span>
      </div>
    </div>

      <div class="kart-total">
        <div class="total">
          <span>Total</span>
        </div>
        <div class="price-total">
          <span>${new Decimal(price.totalPrice).toString()} €</span>
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
    btnRemoveProduct?.forEach((item) => {
      item.addEventListener("click", async () => {
        let itemId = item.dataset.id;
        await Kart.removeItem(itemId);
        document.querySelector("#cart-item-count").innerHTML =
          await Kart.getItemNumber();
      });
    });
  }
  /**
   *
   * @param {*} item
   */
  static async RenderModal(item, qte) {
    const price = await Kart.calculTotalPrice();
    const fraisDivers = await Kart.addFraisDivers();
    const fraisDossier = parseFloat(fraisDivers.frais_dossier);
    const fraisPort = parseFloat(fraisDivers.frais_port);
    let html = /*html*/ `
        <div class="body-modal-detail">
            <img src="/images/produits/${item.media}" alt="" srcset="" />
            <div class="info-product">
            <h4>${item.pro_libelle}</h4>
            <div class="product-montant">${new Decimal(
              item.pad_ttc
            ).toString()}€</div>
            <div class="product-quantity">Quantité : <span> ${qte} </span></div>
            </div>
        </div>
        <div class="modal-body-commande">
            <h5>Il y a ${await Kart.getItemNumber()} articles dans votre panier.</h5>
            <div class="sous-total">
                <span class="sous-total-titre">Sous-total :</span>
                <span class="sous-total-montant">${new Decimal(
                  price.kartProductPrice
                ).toString()} €</span>
            </div>
            <div class="transport">
                <span class="transport-titre">transport:</span>
                <span class="transport-montant">${new Decimal(
                  fraisPort
                ).toString()} €</span>
            </div>
            <div class="transport">
                <span class="transport-titre">frais dossier:</span>
                <span class="transport-montant">${new Decimal(
                  fraisDossier
                ).toString()} €</span>
            </div>
            <div class="total">
                <span class="total-titre">total:</span>
                <span class="total-montant">${new Decimal(
                  price.totalPrice
                ).toString()} €</span>
            </div>
            <div class="btn-achat">
                <button class="continuer"  data-bs-dismiss="modal"
                aria-label="Close">Continuer mes achats</button>
                <a href="/panier/#page-panier" class="finaliser">
                    <i class="fa fa-check icon-succes"></i>
                    <span>Finaliser le devis</span>
                </a>
            </div>
        </div>
        `;
    document.querySelector("#myModal .body-modal").innerHTML = html;
    document.querySelector("#modal-btn-close").addEventListener("click", () => {
      document.querySelector(
        "#myModal .body-modal"
      ).innerHTML = `<img src="/images/loader.gif" alt="" />`;
    });
  }
  static async RenderMaxQteModal() {
    let html = /*html*/ `
        <div class="modal-body-commande">
            <h5>Vous avez déjà ajouté au panier le quantité disponible pour cet article</h5>
        </div>
        `;
    document.querySelector("#myModal .body-modal").innerHTML = html;
  }
  static RenderMaxQteUpdateModal() {
    let myModal = new bootstrap.Modal(document.querySelector("#maxQteModal"), {
      keyboard: false,
    });
    myModal.show();
  }
  static RenderDeleteModal() {
    let removeModal = new bootstrap.Modal(
      document.querySelector("#removeModel"),
      {
        keyboard: false,
      }
    );
    removeModal.show();
  }
  static HideDeleteModal() {
    let removeModal = document.querySelector("#removeModel");
    let modal = bootstrap.Modal.getInstance(removeModal);
    modal.hide();
  }
}
