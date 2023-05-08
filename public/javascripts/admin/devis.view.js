"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var btnDocFormNote = document.querySelector('.btn-form-doc-note');
var btnDocFormPaiement = document.querySelector('.btn-form-doc-paiement');
var trFormNote = document.querySelector('.tr-form-note');
var trFormPaiement = document.querySelector('.tr-form-paiement');
var btnEditProds = document.querySelectorAll('.btn-edit-prod');
var btnUpdateExistAdresseFacturation = document.querySelector('.btn-update-exist-adresse-facturation');
var btnUpdateExistAdresseLivraison = document.querySelector('.btn-update-exist-adresse-livraison');
var modalUpdateAdressFacturationEl = document.querySelector('#modal-update-adresse-facturation');
var modalUpdateAdressFacturationElForm = document.querySelector('#modal-update-adresse-facturation .modal-dialog .modal-content .modal-content-form');
var modalUpdateAdressLivraisonEl = document.querySelector('#modal-update-adresse-livraion');
var modalUpdateAdressLivraisonElForm = document.querySelector('#modal-update-adresse-livraion .modal-dialog .modal-content .modal-content-form');
var modalUpdateAdressFacturation = new bootstrap.Modal(modalUpdateAdressFacturationEl);
var modalUpdateAdressLivraison = new bootstrap.Modal(modalUpdateAdressLivraisonEl);
var btnShowAddPanierDetailForm = document.querySelector('.btn-add-panier-detail');
var btnDisableAddPanierDetailForm = document.querySelector('.btn-disable-add-panier-detail');
var addPanierDetailForm = document.querySelector('.form-add-panier-detail-container');
var addPanierDetailInputLibelle = document.querySelector('.add-panier-detail-input-name');
//const produitdatalistOptions = document.querySelector('#produitdatalistOptions');
//simple MDE
(function () {
  var simplemde = new SimpleMDE({
    element: document.querySelector("#devis-note-textarea"),
    forceSync: true,
    spellChecker: false,
    initialValue: "Tapez ici..."
  });
})();

/**
 * Affichage du formulaire de note de commande => Tabs (Documents)
 */
btnDocFormNote.addEventListener('click', function (e) {
  trFormNote.style.display === '' ? trFormNote.style.display = 'table-row' : trFormNote.style.display = '';
});
/**
 * Affichage du formulaire de note de paiement => Tabs (Documents)
 */
btnDocFormPaiement.addEventListener('click', function (e) {
  trFormPaiement.style.display === '' ? trFormPaiement.style.display = 'table-row' : trFormPaiement.style.display = '';
});
btnEditProds.forEach(function (btnEditProd) {
  btnEditProd.addEventListener('click', function (e) {
    var padId = e.target.dataset.pad;
    var trFormEditPro = document.querySelector(".tr-form-edit-prod-".concat(padId));
    console.log(".tr-form-edit-prod-".concat(padId), padId);
    trFormEditPro.style.display === '' ? trFormEditPro.style.display = 'table-row' : trFormEditPro.style.display = '';
  }, true);
});

// adresse 
/**
 * formulaire modification adresse de facturation existante 
 */
btnUpdateExistAdresseFacturation.addEventListener('click', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
    var commandeId, adresseId, adresse;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          commandeId = e.target.dataset.commande;
          adresseId = e.target.dataset.adresse;
          _context.next = 4;
          return axios.get('/admin/adresse/byAjax/' + adresseId);
        case 4:
          adresse = _context.sent;
          // console.log(modalUpdateAdressFacturationElForm,adresse);
          modalUpdateAdressFacturation.show();
          showModalUpdateAdresse(modalUpdateAdressFacturationElForm, adresse, commandeId);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
btnUpdateExistAdresseLivraison.addEventListener('click', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e) {
    var commandeId, adresseId, adresse;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          commandeId = e.target.dataset.commande;
          adresseId = e.target.dataset.adresse;
          _context2.next = 4;
          return axios.get('/admin/adresse/byAjax/' + adresseId);
        case 4:
          adresse = _context2.sent;
          modalUpdateAdressLivraison.show();
          console.log(adresse);
          showModalUpdateAdresse(modalUpdateAdressLivraisonElForm, adresse, commandeId);
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
var showModalUpdateAdresse = function showModalUpdateAdresse(modal, adresse, commandeId) {
  modal.innerHTML = /*html*/"\n    <form action=\"/admin/adresse/update-from-commande\" method=\"post\">\n        <div class=\"mb-3\">\n            <label class=\"form-label\" for=\"\"> Nom de la structure</label>\n            <input class=\"form-control\" placeholder=\"\" type=\"text\" name=\"adr_structure\" required value=\"".concat(adresse.data.adr_structure, "\"/>\n        </div>\n        <div class=\"mb-3\">\n            <label class=\"form-label\" for=\"\"><span>* </span>Nom</label>\n            <input class=\"form-control\" placeholder=\"Romain\" type=\"text\" name=\"adr_nom\" id=\"\" value=\"").concat(adresse.data.adr_nom, "\" />\n        </div>\n        <div class=\"mb-3\">\n            <label class=\"form-label\" for=\"\"> <span>* </span>Prenom</label>\n            <input class=\"form-control\" placeholder=\"Romain\" type=\"text\" name=\"adr_prenom\" id=\"\" value=\"").concat(adresse.data.adr_prenom, "\" />\n        </div>\n        <div class=\"mb-3\">\n            <label class=\"form-label\" for=\"\"> Soci\xE9t\xE9</label>\n            <input class=\"form-control\" placeholder=\"\" type=\"text\" name=\"adr_societe\" id=\"\" required value=\"").concat(adresse.data.adr_societe, "\"/>\n        </div>\n        <div class=\"mb-3\">\n            <label class=\"form-label\" for=\"\"> Num\xE9ro de TVA</label>\n            <input class=\"form-control\" placeholder=\"\" type=\"text\" name=\"adr_num_tva\" id=\"\" value=\"").concat(adresse.data.adr_num_tva, "\"/>\n        </div>\n        <div class=\"mb-3\">\n            <label class=\"form-label\" for=\"\"> <span>* </span>Adresse</label>\n            <input class=\"form-control\" placeholder=\"\" type=\"text\" name=\"adr_adresse\" id=\"\" value=\"").concat(adresse.data.adr_adresse, "\"/>\n        </div>\n        <div class=\"mb-3\">\n            <label class=\"form-label\" for=\"\"> Compl\xE9ment d'adresse</label>\n            <input class=\"form-control\" placeholder=\"\" type=\"text\" name=\"adr_comp\" id=\"\" value=\"").concat(adresse.data.adr_comp, "\"/>\n        </div>\n        <div class=\"mb-3\">\n            <label class=\"form-label\" for=\"\"> <span>* </span>Code postal</label>\n            <input class=\"form-control\" placeholder=\"\" type=\"text\" name=\"adr_cp\" id=\"\" value=\"").concat(adresse.data.adr_cp, "\"/>\n        </div>\n        <div class=\"mb-3\">\n            <label class=\"form-label\" for=\"\"> <span>* </span>Ville</label>\n            <input class=\"form-control\" placeholder=\"\" type=\"text\" name=\"adr_ville\" id=\"\" value=\"").concat(adresse.data.adr_ville, "\"/>\n        </div>\n        <div class=\"mb-3\">\n            <label class=\"form-label\" for=\"\"> <span>* </span>Pays</label>\n            <input class=\"form-control\" placeholder=\"\" type=\"text\" name=\"adr_pays\" id=\"\" value=\"").concat(adresse.data.adr_pays, "\"/>\n        </div>\n        <div class=\"mb-3\">\n            <input type=\"hidden\" name=\"com_id\" value=\"").concat(commandeId, "\">\n            <input type=\"hidden\" name=\"adr_id\" value=\"").concat(adresse.data.adr_id, "\">\n            <button class=\"btn btn-primary\" type=\"submit\">Enregistrer</button>\n        </div>\n    </form>\n    ");
};
btnShowAddPanierDetailForm.addEventListener('click', function (e) {
  addPanierDetailForm.style.display = 'block';
});
btnDisableAddPanierDetailForm.addEventListener('click', function (e) {
  e.preventDefault();
  addPanierDetailForm.style.display = 'none';
});

// addPanierDetailInputLibelle.addEventListener('keydown',async (e)=>{
//     var eventSource = e.key ? 'input':'list';
//    console.log(e.key);
//     if (e.target.value.toString() !== '') {
//         let produits = await axios.get(`${SITE_URL}/admin/produits/autocomplete-search/${e.target.value.toString()}`)
//         //produitdatalistOptions
//         console.log(produits.data);
//         var datalistOptions = ``;
//         produits.data.map(produit=>{
//             datalistOptions += `<option data-id="${produit.pro_id}" value="${produit.pro_libelle}">`
//         });
//         produitdatalistOptions.innerHTML = datalistOptions;
//     }
// })
// addPanierDetailInputLibelle.addEventListener('input',(e)=>{
//     let value = e.target.value;
//     let pro_id = e.target.dataset.id;
//     if (typeof eventSource != 'undefined' && eventSource === 'list') {
//         console.log(pro_id);
//         console.log('CLICKED! ',value,pro_id);
//     }
// })
_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
  var produits, autocomplete;
  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        autocomplete = function _autocomplete(inp, arr) {
          var currentFocus;
          inp.addEventListener("input", function (e) {
            var a,
              b,
              i,
              val = this.value;
            closeAllLists();
            if (!val) {
              return false;
            }
            currentFocus = -1;
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(a);
            arr.forEach(function (produit) {
              if (produit.pro_libelle.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + produit.pro_libelle.substr(0, val.length) + "</strong>";
                b.innerHTML += produit.pro_libelle.substr(val.length);
                b.innerHTML += "<input type='hidden' data-produit='" + produit.pro_id + "' value='" + produit.pro_libelle + "'>";
                b.addEventListener("click", function (e) {
                  inp.value = this.getElementsByTagName("input")[0].value;
                  inp.dataset.produit = produit.pro_id;
                  closeAllLists();
                });
                a.appendChild(b);
              }
            });
          });
          inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
              currentFocus++;
              addActive(x);
            } else if (e.keyCode == 38) {
              currentFocus--;
              addActive(x);
            } else if (e.keyCode == 13) {
              e.preventDefault();
              if (currentFocus > -1) {
                if (x) x[currentFocus].click();
              }
            }
          });
          function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = x.length - 1;
            x[currentFocus].classList.add("autocomplete-active");
          }
          function removeActive(x) {
            for (var i = 0; i < x.length; i++) {
              x[i].classList.remove("autocomplete-active");
            }
          }
          function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
              if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
              }
            }
          }
          document.addEventListener("click", function (e) {
            closeAllLists(e.target);
          });
        };
        _context3.next = 3;
        return axios.get("".concat(SITE_URL, "/admin/produits/allbyJson"));
      case 3:
        produits = _context3.sent;
        autocomplete(document.getElementById("myInput"), produits.data);
      case 5:
      case "end":
        return _context3.stop();
    }
  }, _callee3);
}))();