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
    key: "addItem",
    value: function addItem(item) {
      var storedITems = JSON.parse(localStorage.getItem('storedItems'));
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
        localStorage.setItem('storedItems', JSON.stringify(storedITems));
      } else {
        Kart.items.push(itemForPanier);
        localStorage.setItem('storedItems', JSON.stringify(Kart.items));
      }
      Kart.kartRenderItems();
    }
  }, {
    key: "kartRenderItems",
    value: function kartRenderItems() {
      var kartItemsElement = document.querySelector('.kart-items');
      var storedITems = JSON.parse(localStorage.getItem('storedItems'));
      var storedItemsHtml = "";
      storedITems.map(function (produit) {
        storedItemsHtml += "\n            <div class=\"kart-item\">\n                <div class=\"kart-img\">\n                    <img src=\"/images/produits/".concat(produit.media, "\" alt=\"\">\n                </div>\n                <div class=\"kart-content\">\n                    <a href=\"/article/").concat(produit.pro_id, "\">").concat(produit.pro_libelle, "</a>\n                    <div class=\"actions\">\n                        <span class=\"price\">").concat(produit.pad_ttc, "</span>\n                        <button class=\"btn-close\"></button>\n                    </div>\n                </div>\n            </div>\n            ");
      });
      kartItemsElement.innerHTML = storedItemsHtml;
    }
  }]);
  return Kart;
}();
_defineProperty(Kart, "items", []);