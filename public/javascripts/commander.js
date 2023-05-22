"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
//change for big title on bloc-form
var infoFormInscription = document.querySelector(".info-form-inscription");
var infoFormConnexion = document.querySelector(".info-form-connexion");
var adresseForm = document.querySelector("#adresse-form");
var livraisonForm = document.querySelector("#livraison-form");
var infoContent = document.querySelector("#info-content");
var adresseDiv = document.querySelector("#divAdress");
var livraisonDiv = document.querySelector("#divLivraison");
var finalisationDiv = document.querySelector("#divFinalisation");
var adresseContainer = document.querySelector("#adresse");
var livraisonContainer = document.querySelector("#livraison");
var finalisationContainer = document.querySelector("#finalisation");
var btnModiferInfo = document.querySelector("#info-mod-btn");
var btnModiferAdresse = document.querySelector("#adresse-mod-btn");
var btnModiferlivraison = document.querySelector("#livraison-mod-btn");
var btnModiferfinalisation = document.querySelector("#finalisation-mod-btn");
var checkSuccess = document.querySelector(".check-success");
var checkAdresse = document.querySelector(".check-adresse");
var checkLivraison = document.querySelector(".check-livraison");
var cursorAdresse = document.querySelector(".adresse-cursor");
var cursorfinalisation = document.querySelector(".finalisation-cursor");
var cursorLivraison = document.querySelector(".livraison-cursor");
var borderNumber = document.querySelector(".border-number");
var adresseBg = document.querySelector(".adresse-bg");
var livraisonBg = document.querySelector(".livraison-bg");
var finalisationBg = document.querySelector(".finalisation-bg");
var btn_info_client_connected = document.querySelector(".btn_info_client_connected");

//for class tabs
var navlink_one = document.querySelector(".btn-tab-one");
var navlink_two = document.querySelector(".btn-tab-two");
var password = document.getElementById("password");
var btn = document.getElementById("btn-action");

//animation code promoif-codepromo
var formPromo = document.querySelector(".form-promo");
var closeForme = document.querySelector("#close-form");
var textPromo = document.querySelector(".text-promo");
var ifCodePromo = document.querySelector("#if-codepromo");
ifCodePromo.addEventListener("click", function () {
  formPromo.style.display = "block";
  textPromo.style.display = "none";
});
closeForme.addEventListener("click", function () {
  formPromo.style.display = "none";
  textPromo.style.display = "block";
});
var eventAccordeonForm = function eventAccordeonForm(nextDiv, currentDiv, btnModifier, nexDiv, changeBorder, iconSuccess, eventCursor, classAdresse) {
  nextDiv.style.display = "block";
  currentDiv.style.display = "none";
  btnModifier.style.display = "block";
  nexDiv.style.opacity = "1";
  changeBorder.style.color = "grey";
  changeBorder.style.backgroundColor = "white";
  changeBorder.style.border = "1px solid grey";
  iconSuccess.style.display = "block";
  eventCursor.style.cursor = "default";
  classAdresse.style.backgroundColor = "#61ce70";
  classAdresse.style.color = "white";
  classAdresse.style.border = "1px solid #61ce70";
};

// change events on infoForm
infoFormInscription === null || infoFormInscription === void 0 ? void 0 : infoFormInscription.addEventListener("submit", function (event) {
  event.preventDefault();
  eventAccordeonForm(adresseDiv, infoContent, btnModiferInfo, adresseContainer, borderNumber, checkSuccess, cursorAdresse, adresseBg);
});
infoFormConnexion === null || infoFormConnexion === void 0 ? void 0 : infoFormConnexion.addEventListener("submit", function (event) {
  event.preventDefault();
  eventAccordeonForm(adresseDiv, infoContent, btnModiferInfo, adresseContainer, borderNumber, checkSuccess, cursorAdresse, adresseBg);
});
btnModiferInfo.addEventListener("click", function (event) {
  event.preventDefault();
  adresseDiv.style.display = "none";
  infoContent.style.display = "flex";
  borderNumber.style.color = "white";
  borderNumber.style.backgroundColor = "#61ce70";
  borderNumber.style.border = "1px solid #61ce70";
  checkSuccess.style.display = "none";
  adresseBg.style.color = "grey";
  adresseBg.style.backgroundColor = "white";
  adresseBg.style.border = "1px solid grey";
});
btn_info_client_connected === null || btn_info_client_connected === void 0 ? void 0 : btn_info_client_connected.addEventListener("click", function (event) {
  eventAccordeonForm(adresseDiv, infoContent, btnModiferInfo, adresseContainer, borderNumber, checkSuccess, cursorAdresse, adresseBg);
});

//change events on adresseForm
adresseForm === null || adresseForm === void 0 ? void 0 : adresseForm.addEventListener("submit", function (event) {
  event.preventDefault();
  eventAccordeonForm(livraisonDiv, adresseDiv, btnModiferAdresse, livraisonContainer, adresseBg, checkAdresse, cursorLivraison, livraisonBg);
});
btnModiferAdresse.addEventListener("click", function (event) {
  event.preventDefault();
  livraisonDiv.style.display = "none";
  adresseDiv.style.display = "block";
  adresseBg.style.color = "white";
  adresseBg.style.backgroundColor = "#61ce70";
  adresseBg.style.border = "1px solid #61ce70";
  checkAdresse.style.display = "none";
  livraisonBg.style.color = "grey";
  livraisonBg.style.backgroundColor = "white";
  livraisonBg.style.border = "1px solid grey";
});

//change events on livraisonForm
livraisonForm.addEventListener("submit", function (event) {
  event.preventDefault();
  eventAccordeonForm(finalisationDiv, livraisonDiv, btnModiferlivraison, finalisationContainer, livraisonBg, checkLivraison, cursorfinalisation, finalisationBg);
});
btnModiferlivraison.addEventListener("click", function (event) {
  event.preventDefault();
  finalisationDiv.style.display = "none";
  livraisonDiv.style.display = "block";
  livraisonBg.style.color = "white";
  livraisonBg.style.backgroundColor = "#61ce70";
  livraisonBg.style.border = "1px solid #61ce70";
  checkLivraison.style.display = "none";
  finalisationBg.style.color = "grey";
  finalisationBg.style.backgroundColor = "white";
  finalisationBg.style.border = "1px solid grey";
});

//event hide/show password on form
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function (e) {
  e.preventDefault();
  var type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  if (password.getAttribute("type") === "password") btn.textContent = "Montrer";else btn.textContent = "Cacher";
});

//tabs
navlink_one === null || navlink_one === void 0 ? void 0 : navlink_one.addEventListener("click", function () {
  navlink_one.classList.add("button-add");
  navlink_two.classList.remove("button-add");
});
navlink_two === null || navlink_two === void 0 ? void 0 : navlink_two.addEventListener("click", function () {
  navlink_two.classList.add("button-add");
  navlink_one.classList.remove("button-add");
});
function toggle_visibility(id) {
  var element = document.getElementById(id);
  if (element.style.display === "none") {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}
_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var qte, radios, artcle, _yield$Kart$calculTot, kartProductPrice, totalPrice, fraisDivers;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return Kart.getItemNumber();
      case 2:
        qte = _context.sent;
        radios = document.querySelectorAll("[name=radio_mode_livraison]");
        document.querySelector("#cmd-item-panier").innerHTML = qte ? qte : 0;
        artcle = qte == 0 ? "article" : "articles";
        document.querySelector("#article").innerHTML = artcle;
        _context.next = 9;
        return Kart.calculTotalPrice();
      case 9:
        _yield$Kart$calculTot = _context.sent;
        kartProductPrice = _yield$Kart$calculTot.kartProductPrice;
        totalPrice = _yield$Kart$calculTot.totalPrice;
        document.querySelector("#sous-total").innerHTML = "".concat(kartProductPrice.toFixed(2).toString().replace(".", ","), " \u20AC");
        _context.next = 15;
        return Kart.addFraisDivers();
      case 15:
        fraisDivers = _context.sent;
        document.querySelector("#dossier-price").innerHTML = "".concat(fraisDivers.frais_dossier.toFixed(2).toString().replace(".", ","), " \u20AC");
        document.querySelector("#livraison-price").innerHTML = "".concat(fraisDivers.frais_port.toFixed(2).toString().replace(".", ","), " \u20AC");
        document.querySelector("#total-price").innerHTML = "".concat(totalPrice.toFixed(2).toString().replace(".", ","), " \u20AC");
        radios === null || radios === void 0 ? void 0 : radios.forEach(function (radio) {
          radio.addEventListener("click", function (e) {
            var frp_ttc = e.target.dataset.ttc;
            var total = parseFloat(frp_ttc) + kartProductPrice + fraisDivers.frais_dossier;
            document.querySelector("#total-price").innerHTML = "".concat(total.toFixed(2).toString().replace(".", ","), " \u20AC");
            document.querySelector("#livraison-price").innerHTML = "".concat(parseFloat(frp_ttc).toFixed(2).toString().replace(".", ","), " \u20AC");
          });
        });
      case 20:
      case "end":
        return _context.stop();
    }
  }, _callee);
}))();