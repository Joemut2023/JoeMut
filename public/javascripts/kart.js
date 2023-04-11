"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Classe répresentant le kadi
 */
var Kart = /*#__PURE__*/function () {
  function Kart() {
    _classCallCheck(this, Kart);
  }
  _createClass(Kart, null, [{
    key: "getParsedBasket",
    value:
    /**
     *
     * @returns Array
     */
    function getParsedBasket() {
      return JSON.parse(localStorage.getItem("storedItems"));
    }
    /**
     *
     * @param {Array} item
     */
  }, {
    key: "addItem",
    value: function addItem(item) {
      var storedITems = JSON.parse(localStorage.getItem("storedItems"));
      var itemForPanier = {
        pro_id: item.pro_id,
        pro_libelle: item.pro_libelle,
        pad_qte: 1,
        pad_ttc: item.Tarifs[0].tar_ttc,
        pad_ht: item.Tarifs[0].tar_ht,
        media: item.Media[0].med_ressource
      };
      if (storedITems) {
        var produitFilter = storedITems.filter(function (produit) {
          return produit.pro_id == item.pro_id;
        });
        var produit = produitFilter[0];
        if (produitFilter.length !== 0) {
          produit.pad_qte = produit.pad_qte + 1;
          var produitPositionInArray = storedITems.findIndex(function (produit) {
            return produit.pro_id === item.pro_id;
          });
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
  }, {
    key: "removeItem",
    value: function removeItem(itemId) {
      var storedITems = Kart.getParsedBasket();
      var produitPositionInArray = storedITems.findIndex(function (produit) {
        return produit.pro_id == itemId;
      });
      storedITems.splice(produitPositionInArray, 1);
      localStorage.setItem("storedItems", JSON.stringify(storedITems));
      Kart.kartRenderItems();
    }
    /**
     * Affiche les items du panier
     */
  }, {
    key: "kartRenderItems",
    value: function kartRenderItems() {
      var kartItemsElement = document.querySelector(".kart-items");
      var storedITems = Kart.getParsedBasket();
      var storedItemsHtml = "";
      var kartProductQte = 0;
      var kartProductPrice = 0;
      storedITems === null || storedITems === void 0 ? void 0 : storedITems.map(function (produit) {
        kartProductQte = produit.pad_qte + kartProductQte;
        kartProductPrice = produit.pad_qte * produit.pad_ttc + kartProductPrice;
        storedItemsHtml += "\n            <div>\n                <div class=\"kart-item\">\n                    <div class=\"kart-img\">\n                        <img src=\"/images/produits/".concat(produit.media, "\" alt=\"\">\n                    </div>\n                    <div class=\"kart-content\">\n                        <a href=\"/article/").concat(produit.pro_id, "\">").concat(produit.pro_libelle, "</a>\n                        <div class=\"actions\">\n                            <span class=\"price\">").concat(produit.pad_qte, " x ").concat(produit.pad_ttc, " \u20AC</span>\n                            <button id=\"remove-prod\" data-id=\"").concat(produit.pro_id, "\" class=\"btn-close\"></button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <hr>\n            ");
      });
      kartItemsElement.innerHTML = storedItemsHtml;
      var kartInfosData = "\n    <div>\n    <p id=\"par-empty-data\">Aucun produit dans le chariot.</p>\n      <div class=\"kart-article\">\n        <div class=\"nbr-article\">\n          <span>".concat(kartProductQte, " articles</span>\n        </div>\n        <div class=\"price\">\n          <span>").concat(kartProductPrice, " \u20AC</span>\n        </div>\n      </div>\n\n      <div class=\"kart-livraison\">\n        <div class=\"total\">\n          <span>Livraison</span>\n        </div>\n        <div class=\"price-total\">\n          <span></span>\n        </div>\n      </div>\n\n      <div class=\"kart-total\">\n        <div class=\"total\">\n          <span>Total</span>\n        </div>\n        <div class=\"price-total\">\n          <span>15$</span>\n        </div>\n      </div>\n      <hr>\n      <div class=\"kart-btns\">\n      <a href=\"/panier/#page-panier\" class=\"btn-voirpanier\">\n        <button>\n          Voir le <br />\n          panier\n        </button>\n      </a>\n      <a href=\"/commander/#page-commander\" class=\"btn-commander\">\n        <button>Commander</button>\n      </a>\n    </div>\n    </div>\n    ");
      document.querySelector("#kart-infos").innerHTML = kartInfosData;
      storedITems.length == 0 ? document.querySelector("#par-empty-data").style.display = "block" : null;
      var btnRemoveProduct = document.querySelectorAll("#remove-prod");
      btnRemoveProduct.forEach(function (item) {
        item.addEventListener("click", function () {
          var itemId = item.dataset.id;
          Kart.removeItem(itemId);
        });
      });
    }
    /**
     *
     * @param {*} item
     */
  }, {
    key: "RenderModal",
    value: function RenderModal(item) {
      var storedITems = Kart.getParsedBasket();
      var html = /*html*/"\n        <div class=\"body-modal-detail\">\n            <img src=\"/images/produits/".concat(item.media, "\" alt=\"\" srcset=\"\" />\n            <div class=\"info-product\">\n            <h4>").concat(item.pro_libelle, "</h4>\n            <div class=\"product-montant\">7,00 \u20AC</div>\n            <div class=\"product-quantity\">Quantit\xE9 : <span> ").concat(item.pad_qte, " </span></div>\n            </div>\n        </div>\n        <div class=\"modal-body-commande\">\n            <h5>Il y a ").concat(storedITems.length, " articles dans votre panier.</h5>\n            <div class=\"sous-total\">\n                <span class=\"sous-total-titre\">Sous-total :</span>\n                <span class=\"sous-total-montant\">87,50 \u20AC</span>\n            </div>\n            <div class=\"transport\">\n                <span class=\"transport-titre\">transport:</span>\n                <span class=\"transport-montant\">87,50 \u20AC</span>\n            </div>\n            <div class=\"total\">\n                <span class=\"total-titre\">total:</span>\n                <span class=\"total-montant\">87,50 \u20AC</span>\n            </div>\n            <div class=\"btn-achat\">\n                <button class=\"continuer\">Continuer mes achats</button>\n                <a href=\"/panier/#page-panier\" class=\"finaliser\">\n                    <i class=\"fa fa-check icon-succes\"></i>\n                    <span>Finaliser le devis</span>\n                </a>\n            </div>\n        </div>\n        ");
      document.querySelector("#myModal .body-modal").innerHTML = html;
    }
  }]);
  return Kart;
}();
_defineProperty(Kart, "items", []);