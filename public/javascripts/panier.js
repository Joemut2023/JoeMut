"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var panierDetails = document.querySelector(".comment");
var PanierPrice = document.querySelector(".panier-price");
var emptyKartText = document.querySelector("#empty-product-kart");
var storedITems = Kart.getAllPanierDetails();
var TotalePrice = 0;
var RenderKartProduct = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var panierDetailsHtml, btnTrash, btnFinaliser, eventlistner;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          panierDetailsHtml = "";
          _context.next = 3;
          return Kart.getAllPanierDetails();
        case 3:
          storedITems = _context.sent;
          storedITems.map(function (produit) {
            panierDetailsHtml += "\n  <div class=\"articles row\">\n    <div class=\"col-md-1 col-sm-1 col-1 id\">".concat(produit.Produit.pro_ref, "</div>\n  <div class=\"col-md-3 col-sm-4 col-4 image\">\n    <span><img src=\"/images/produits/").concat(produit.Produit.Media[0].med_ressource, "\" class=\"img-fluid\" alt=\"\" /></span>\n  </div>\n  <div class=\"col-md-3 col-sm-7 col-7 description\">\n    <div class=\"desc\">\n      <a href=\"/article/").concat(produit.pro_id, "\"><span>").concat(produit.Produit.pro_libelle, "</span></a>\n    </div>\n    <p class=\"price\">").concat(produit.pad_ttc.toFixed(2), " \u20AC</p>\n  </div>\n  <div class=\"col-md-5 col-sm-12 col-12 prices\">\n    <div class=\"row\">\n    <div class=\"hidden col-sm-4 col-3\"></div>\n      <div class=\"col-md-10 col-sm-6 col-7 block-price\">\n        <div class=\"row compteur\">\n          <div class=\"col-md-6 col-sm-6 col-6 qty-btn\">\n            <input type=\"text\" class=\"number-value\" value=\"").concat(produit.pad_qte, "\" />\n            <div class=\"btns\">\n              <button data-id=\"").concat(produit.pro_id, "\" class=\"btn-up\">\n                <span><i class=\"fa-solid fa-chevron-up\"></i></span>\n              </button>\n              <button data-id=\"").concat(produit.pro_id, "\" class=\"btn-down\">\n                <span><i class=\"fa-solid fa-chevron-down\"></i></span>\n              </button>\n            </div>\n          </div>\n          <div class=\"col-md-6 col-sm-6 col-6 prx\">\n            <span>").concat(produit.pad_ttc.toFixed(2), " \u20AC</span>\n          </div>\n        </div>\n      </div>\n      <div data-id=\"").concat(produit.pro_id, "\" class=\"col-md-2 col-sm-2 col-2 delete\">\n        <span><i  class=\"fa-solid fa-trash\" ></i></span>\n      </div>\n    </div>\n  </div>\n  </div>\n");
          });
          panierDetails.innerHTML = panierDetailsHtml;
          btnTrash = document.querySelectorAll(".delete");
          btnFinaliser = document.querySelector(".enable");
          eventlistner = function eventlistner(callback) {
            var btnTrash = document.querySelectorAll(".delete");
            btnTrash.forEach(function (element) {
              element.addEventListener("click", function () {
                var itemId = element.dataset.id;
                Kart.removeItem(itemId);
                TotalPricesProducts();
                document.querySelector("#cart-item-count").innerHTML = Kart.getItemNumber();
                callback();
                if (storedITems.length == 0) {
                  emptyKartText.style.display = "block";
                  btnFinaliser.disabled = true;
                  btnFinaliser.classList.add("btn-enabled");
                }
              });
            });
          };
          btnTrash.forEach(function (element) {
            element.addEventListener("click", function () {
              TotalPricesProducts;
              var itemId = element.dataset.id;
              Kart.removeItem(itemId);
              TotalPricesProducts();
              document.querySelector("#cart-item-count").innerHTML = Kart.getItemNumber();
              RenderKartProduct();
              eventlistner(function () {
                RenderKartProduct();
              });
            });
          });
          if (storedITems.length == 0) {
            emptyKartText.style.display = "block";
            btnFinaliser.disabled = true;
            btnFinaliser.classList.add("btn-enabled");
          }
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function RenderKartProduct() {
    return _ref.apply(this, arguments);
  };
}();
RenderKartProduct();
var btns_up = document.querySelectorAll(".btn-up");
var btns_down = document.querySelectorAll(".btn-down");
var TotalPricesProducts = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
    var storedITems, storedFrais, totalPriceht, totalPoductPrice, totalQuantity, PanierPriceHtml;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Kart.getAllPanierDetails();
        case 2:
          storedITems = _context2.sent;
          _context2.next = 5;
          return Kart.addFraisDivers();
        case 5:
          storedFrais = _context2.sent;
          console.log(storedFrais);
          totalPriceht = 0;
          totalPoductPrice = 0;
          totalQuantity = 0;
          storedITems.forEach(function (element) {
            totalQuantity += element.pad_qte;
            totalPriceht += element.pad_qte * element.pad_ttc;
          });
          totalPoductPrice = totalPriceht + parseFloat(storedFrais.frais_port) + parseFloat(storedFrais.frais_dossier);
          PanierPriceHtml = " \n  <div class=\"frais\">\n    <div class=\"item\">\n      <span class=\"title\">".concat(totalQuantity, " articles</span>\n      <span class=\"price\">").concat(totalPriceht.toFixed(2), "  \u20AC</span>\n    </div>\n    <div class=\"item\">\n      <span class=\"title\">Livraisons</span>\n      <span class=\"price\">").concat(parseFloat(storedFrais.frais_port).toFixed(2), " \u20AC</span>\n    </div>\n    <div class=\"item\">\n      <span class=\"title\">Frais de dossier</span>\n      <span class=\"price\">").concat(parseFloat(storedFrais.frais_dossier).toFixed(2), " \u20AC</span>\n    </div>\n    <hr>\n  </div>\n  <div class=\"item total\">\n  <span>TTC</span>\n  <span>").concat(totalPoductPrice.toFixed(2), " \u20AC</span>\n</div>\n<div class=\"promo\">\n  <div class=\"link\">\n    <p class=\"btnpromo\"><span>Vous avez un code promo ?</span></p>\n  </div>\n  <div class=\"hide-promo promo_block\">\n    <div class=\"btn-promo\">\n      <input type=\"text\" placeholder=\"Code promo\" />\n      <button>Ajouter</button>\n    </div>\n    <p class=\"fermer\">Fermer</p>\n  </div>\n</div>\n<a href=\"/commander/#page-commander\" class=\"button\">\n  <button class=\"enable\">Finaliser le Devis</button>\n</a>\n  ");
          PanierPrice.innerHTML = PanierPriceHtml;
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function TotalPricesProducts() {
    return _ref2.apply(this, arguments);
  };
}();
TotalPricesProducts();
var link_parag = document.querySelector(".btnpromo");
var btn_promo = document.querySelector(".btn-promo");
var code_promo_block = document.querySelector(".promo_block");
var btn_fermer = document.querySelector(".fermer");
var btnFinaliser = document.querySelector(".enable");
if (storedITems.length == 0) {
  emptyKartText.style.display = "block";
  btnFinaliser.disabled = true;
  btnFinaliser.classList.add("btn-enabled");
}
btns_up.forEach(function (element) {
  element.addEventListener("click", function () {
    var itemId = element.dataset.id;
    var compteur = element.parentNode.parentNode.children[0].value;
    compteur = isNaN(compteur) ? 1 : compteur;
    compteur++;
    element.parentNode.parentNode.children[0].value = compteur;
    Kart.updateItemQuantity(itemId, true);
    TotalPricesProducts();
    document.querySelector("#cart-item-count").innerHTML = Kart.getItemNumber();
  });
});
btns_down.forEach(function (element) {
  element.addEventListener("click", function () {
    var itemId = element.dataset.id;
    var decrement = element.parentNode.parentNode.children[0].value;
    decrement = isNaN(decrement) ? 1 : decrement;
    if (decrement > 1) {
      decrement--;
      Kart.updateItemQuantity(itemId, false);
      TotalPricesProducts();
      document.querySelector("#cart-item-count").innerHTML = Kart.getItemNumber();
    }
    element.parentNode.parentNode.children[0].value = decrement;
  });
});
link_parag.addEventListener("click", function () {
  link_parag.classList.add("linkhide");
  code_promo_block.classList.remove("hide-promo");
  code_promo_block.classList.add("code-promo");
});
btn_fermer.addEventListener("click", function () {
  link_parag.classList.remove("linkhide");
  code_promo_block.classList.remove("code-promo");
  code_promo_block.classList.add("hide-promo");
});