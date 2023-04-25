"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
    key: "getAllPanierDetails",
    value:
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
    function () {
      var _getAllPanierDetails = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var panier;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return axios.get("".concat(SITE_URL, "/panierDetail"), {
                headers: {
                  "X-Requested-With": "XMLHttpRequest"
                }
              });
            case 2:
              panier = _context.sent;
              return _context.abrupt("return", panier.data);
            case 4:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getAllPanierDetails() {
        return _getAllPanierDetails.apply(this, arguments);
      }
      return getAllPanierDetails;
    }()
    /**
     *
     * @returns Array
     */
  }, {
    key: "getUserStatut",
    value: function () {
      var _getUserStatut = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var userStatut;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return axios.get("".concat(SITE_URL, "/connexion/userStatut"), {
                headers: {
                  "X-Requested-With": "XMLHttpRequest"
                }
              });
            case 3:
              userStatut = _context2.sent;
              return _context2.abrupt("return", userStatut.data);
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 7]]);
      }));
      function getUserStatut() {
        return _getUserStatut.apply(this, arguments);
      }
      return getUserStatut;
    }()
  }, {
    key: "getParsedFrais",
    value: function () {
      var _getParsedFrais = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", JSON.parse(localStorage.getItem("fraisDivers")));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function getParsedFrais() {
        return _getParsedFrais.apply(this, arguments);
      }
      return getParsedFrais;
    }()
    /**
     * recuperer le statut du client
     * @returns userId or false
     */
    /**
     * recuperer le nombre d'artcile au panier
     * @returns Numeric
     */
  }, {
    key: "getItemNumber",
    value: function () {
      var _getItemNumber = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var userStatut, quantity, storedITems;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return Kart.getUserStatut();
            case 2:
              userStatut = _context4.sent;
              quantity = 0;
              _context4.next = 6;
              return Kart.getAllPanierDetails();
            case 6:
              storedITems = _context4.sent;
              if (!(userStatut == false || storedITems.length == 0)) {
                _context4.next = 9;
                break;
              }
              return _context4.abrupt("return", quantity);
            case 9:
              storedITems === null || storedITems === void 0 ? void 0 : storedITems.forEach(function (element) {
                quantity += element.pad_qte;
              });
              return _context4.abrupt("return", quantity);
            case 11:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function getItemNumber() {
        return _getItemNumber.apply(this, arguments);
      }
      return getItemNumber;
    }()
    /**
     *
     * @param {Array} item
     */
  }, {
    key: "addFraisDivers",
    value: function () {
      var _addFraisDivers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var fraisPort, fraisDossier, fraisDivers;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return axios.get("".concat(SITE_URL, "/fraisPort"), {
                headers: {
                  "X-Requested-With": "XMLHttpRequest"
                }
              });
            case 2:
              fraisPort = _context5.sent;
              _context5.next = 5;
              return axios.get("".concat(SITE_URL, "/fraisDossier"), {
                headers: {
                  "X-Requested-With": "XMLHttpRequest"
                }
              });
            case 5:
              fraisDossier = _context5.sent;
              fraisDivers = {
                frais_port: fraisPort.data.frp_ttc,
                frais_dossier: fraisDossier.data.auf_ttc
              };
              localStorage.setItem("fraisDivers", JSON.stringify(fraisDivers));
              return _context5.abrupt("return", fraisDivers);
            case 9:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function addFraisDivers() {
        return _addFraisDivers.apply(this, arguments);
      }
      return addFraisDivers;
    }()
  }, {
    key: "addItem",
    value: function () {
      var _addItem = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(item) {
        var qte,
          userStatut,
          storedITems,
          itemForPanier,
          _args7 = arguments;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              qte = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : null;
              _context7.next = 3;
              return Kart.getUserStatut();
            case 3:
              userStatut = _context7.sent;
              if (!(userStatut == false)) {
                _context7.next = 6;
                break;
              }
              return _context7.abrupt("return", window.location.href = "".concat(SITE_URL, "/connexion/#page-connexion"));
            case 6:
              storedITems = JSON.parse(localStorage.getItem("storedItems"));
              itemForPanier = {
                pro_id: item.pro_id,
                pro_libelle: item.pro_libelle,
                pad_qte: qte ? parseInt(qte) : 1,
                pad_ttc: item.Tarifs[0].tar_ttc,
                pad_ht: item.Tarifs[0].tar_ht,
                media: item.Media[0].med_ressource,
                pro_ref: item.pro_ref
              };
              _context7.prev = 8;
              axios.post("".concat(SITE_URL, "/panierDetail"), {
                pro_id: item.pro_id,
                pad_qte: itemForPanier.pad_qte,
                headers: {
                  "X-Requested-With": "XMLHttpRequest"
                }
              }).then( /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(res) {
                  var myModal, _qte, produitFilter, produit, produitPositionInArray;
                  return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                    while (1) switch (_context6.prev = _context6.next) {
                      case 0:
                        //console.log(res.data);
                        myModal = document.querySelector("#myModal");
                        myModal.style.display = "flex";
                        if (!(res.data == "indisponible")) {
                          _context6.next = 6;
                          break;
                        }
                        return _context6.abrupt("return", Kart.RenderMaxQteModal());
                      case 6:
                        _qte = res.data.panierDetail.pad_qte;
                        _context6.next = 9;
                        return Kart.RenderModal(itemForPanier, itemForPanier.pad_qte);
                      case 9:
                        if (!storedITems) {
                          _context6.next = 19;
                          break;
                        }
                        produitFilter = storedITems.filter(function (produit) {
                          return produit.pro_id == item.pro_id;
                        });
                        produit = produitFilter[0];
                        if (produitFilter.length !== 0) {
                          produit.pad_qte = produit.pad_qte + itemForPanier.pad_qte;
                          produitPositionInArray = storedITems.findIndex(function (produit) {
                            return produit.pro_id === item.pro_id;
                          });
                          storedITems[produitPositionInArray] = produit;
                        } else {
                          storedITems.push(itemForPanier);
                        }
                        localStorage.setItem("storedItems", JSON.stringify(storedITems));
                        _context6.next = 16;
                        return Kart.getItemNumber();
                      case 16:
                        document.querySelector("#cart-item-count").innerHTML = _context6.sent;
                        _context6.next = 24;
                        break;
                      case 19:
                        Kart.items.push(itemForPanier);
                        localStorage.setItem("storedItems", JSON.stringify(Kart.items));
                        _context6.next = 23;
                        return Kart.getItemNumber();
                      case 23:
                        document.querySelector("#cart-item-count").innerHTML = _context6.sent;
                      case 24:
                      case "end":
                        return _context6.stop();
                    }
                  }, _callee6);
                }));
                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }());
              _context7.next = 16;
              break;
            case 12:
              _context7.prev = 12;
              _context7.t0 = _context7["catch"](8);
              _context7.next = 16;
              return Kart.RenderModal(itemForPanier, qte);
            case 16:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[8, 12]]);
      }));
      function addItem(_x) {
        return _addItem.apply(this, arguments);
      }
      return addItem;
    }()
    /**
     * Supprime un Item du panier
     * @param {Number} itemId
     */
  }, {
    key: "removeItem",
    value: function () {
      var _removeItem = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(itemId) {
        var userStatut, kartLoader, pro_id;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return Kart.getUserStatut();
            case 2:
              userStatut = _context9.sent;
              if (!(userStatut == false)) {
                _context9.next = 5;
                break;
              }
              return _context9.abrupt("return", window.location.href = "".concat(SITE_URL, "/connexion/#page-connexion"));
            case 5:
              kartLoader = document.querySelector(".kart-loader");
              pro_id = parseInt(itemId);
              Kart.RenderDeleteModal();
              axios["delete"]("".concat(SITE_URL, "/panierDetail"), {
                data: {
                  pro_id: pro_id
                },
                headers: {
                  "X-Requested-With": "XMLHttpRequest"
                }
              }).then( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(res) {
                  return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                    while (1) switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return Kart.getItemNumber();
                      case 2:
                        document.querySelector("#cart-item-count").innerHTML = _context8.sent;
                        Kart.HideDeleteModal();
                        kartLoader.style.display = res.data ? "none" : "block";
                        _context8.next = 7;
                        return Kart.kartRenderItems();
                      case 7:
                      case "end":
                        return _context8.stop();
                    }
                  }, _callee8);
                }));
                return function (_x4) {
                  return _ref2.apply(this, arguments);
                };
              }());
              // let storedITems = Kart.getParsedBasket();
              // if (storedITems.length > 0) {
              //   let produitPositionInArray = storedITems.findIndex(
              //     (produit) => produit.pro_id == itemId
              //   );
              //   storedITems.splice(produitPositionInArray, 1);
              //   localStorage.setItem("storedItems", JSON.stringify(storedITems));
              // }
            case 9:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      function removeItem(_x3) {
        return _removeItem.apply(this, arguments);
      }
      return removeItem;
    }()
    /**
     * Mettre à jour la quantité d'un item du panier
     * @param {Number} itemId
     */
  }, {
    key: "updateItemQuantity",
    value: function () {
      var _updateItemQuantity = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(itemId, action) {
        var panierDetail;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return axios.put("".concat(SITE_URL, "/panierDetail"), {
                pro_id: itemId,
                action: action,
                headers: {
                  "X-Requested-With": "XMLHttpRequest"
                }
              });
            case 2:
              panierDetail = _context10.sent;
              return _context10.abrupt("return", panierDetail.data.pad_qte);
            case 4:
            case "end":
              return _context10.stop();
          }
        }, _callee10);
      }));
      function updateItemQuantity(_x5, _x6) {
        return _updateItemQuantity.apply(this, arguments);
      }
      return updateItemQuantity;
    }()
    /**
     * Calculer les prix des artciles dans le panier
     */
  }, {
    key: "calculTotalPrice",
    value: function () {
      var _calculTotalPrice = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        var fraisDivers, storedITems, fraisDossier, fraisPort, kartProductPrice, totalPrice;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return Kart.addFraisDivers();
            case 2:
              fraisDivers = _context11.sent;
              _context11.next = 5;
              return Kart.getAllPanierDetails();
            case 5:
              storedITems = _context11.sent;
              fraisDossier = parseFloat(fraisDivers.frais_dossier);
              fraisPort = parseFloat(fraisDivers.frais_port);
              kartProductPrice = 0;
              totalPrice = 0;
              storedITems === null || storedITems === void 0 ? void 0 : storedITems.forEach(function (produit) {
                kartProductPrice = kartProductPrice + produit.pad_qte * produit.pad_ttc;
                totalPrice = kartProductPrice + fraisDossier + fraisPort;
              });
              return _context11.abrupt("return", {
                totalPrice: totalPrice,
                kartProductPrice: kartProductPrice
              });
            case 12:
            case "end":
              return _context11.stop();
          }
        }, _callee11);
      }));
      function calculTotalPrice() {
        return _calculTotalPrice.apply(this, arguments);
      }
      return calculTotalPrice;
    }()
    /**
     * Affiche les items du panier
     */
  }, {
    key: "kartRenderItems",
    value: function () {
      var _kartRenderItems = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
        var userStatut, kartItemsElement, kartLoader, fraisDivers, price, fraisDossier, fraisPort, panierDetail, storedItemsHtml, kartProductQte, kartInfosData, btnRemoveProduct;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return Kart.getUserStatut();
            case 2:
              userStatut = _context13.sent;
              if (!(userStatut == false)) {
                _context13.next = 5;
                break;
              }
              return _context13.abrupt("return", window.location.href = "".concat(SITE_URL, "/connexion/#page-connexion"));
            case 5:
              kartItemsElement = document.querySelector(".kart-items");
              kartLoader = document.querySelector(".kart-loader");
              _context13.next = 9;
              return Kart.addFraisDivers();
            case 9:
              fraisDivers = _context13.sent;
              _context13.next = 12;
              return Kart.calculTotalPrice();
            case 12:
              price = _context13.sent;
              fraisDossier = parseFloat(fraisDivers.frais_dossier);
              fraisPort = parseFloat(fraisDivers.frais_port);
              _context13.next = 17;
              return Kart.getAllPanierDetails();
            case 17:
              panierDetail = _context13.sent;
              storedItemsHtml = "";
              kartProductQte = 0;
              if (panierDetail.length !== 0) {
                panierDetail === null || panierDetail === void 0 ? void 0 : panierDetail.map(function (produit) {
                  kartProductQte = produit.pad_qte + kartProductQte;
                  storedItemsHtml += "\n              <div>\n                  <div class=\"kart-item\">\n                      <div class=\"kart-img\">\n                          <img src=\"/images/produits/".concat(produit.Produit.Media[0].med_ressource, "\" alt=\"\">\n                      </div>\n                      <div class=\"kart-content\">\n                          <a href=\"/article/").concat(produit.pro_id, "\">").concat(produit.Produit.pro_libelle, "</a>\n                          <div class=\"actions\">\n                              <span class=\"price\">").concat(produit.pad_qte, " x ").concat(parseFloat(produit.pad_ttc).toFixed(2), " \u20AC</span>\n                              <button id=\"remove-prod\" data-id=\"").concat(produit.pro_id, "\" class=\"btn-close\"></button>\n                          </div>\n                      </div>\n                  </div>\n              </div>\n              <hr>\n              ");
                });
                kartLoader.style.display = kartItemsElement.innerHTML ? "none" : "block";
                kartItemsElement.innerHTML = storedItemsHtml;
              } else {
                kartItemsElement.innerHTML = "";
                kartLoader.style.display = "none";
              }
              kartInfosData = "\n    <div>\n    <p id=\"par-empty-data\">Aucun produit dans le chariot.</p>\n      <div class=\"kart-article\">\n        <div class=\"nbr-article\">\n          <span>".concat(kartProductQte, " articles</span>\n        </div>\n        <div class=\"price\">\n          <span>").concat(price.kartProductPrice.toFixed(2), " \u20AC</span>\n        </div>\n      </div>\n\n      <div class=\"kart-livraison\">\n        <div class=\"total\">\n          <span>Livraison</span>\n        </div>\n        <div class=\"price-total\">\n        <span>").concat(parseFloat(fraisPort).toFixed(2), " \u20AC</span> \n        </div>\n      </div>\n      <div class=\"kart-livraison\">\n      <div class=\"total\">\n        <span>Frais dossier</span>\n      </div>\n      <div class=\"price-total\">\n        <span>").concat(parseFloat(fraisDossier).toFixed(2), " \u20AC</span>\n      </div>\n    </div>\n\n      <div class=\"kart-total\">\n        <div class=\"total\">\n          <span>Total</span>\n        </div>\n        <div class=\"price-total\">\n          <span>").concat(price.totalPrice.toFixed(2), " \u20AC</span>\n        </div>\n      </div>\n      <hr>\n      <div class=\"kart-btns\">\n      <a href=\"/panier/#page-panier\" class=\"btn-voirpanier\">\n        <button>\n          Voir le <br />\n          panier\n        </button>\n      </a>\n      <a href=\"/commander/#page-commander\" class=\"btn-commander\">\n        <button>Commander</button>\n      </a>\n    </div>\n    </div>\n    ");
              document.querySelector("#kart-infos").innerHTML = kartInfosData;
              // storedITems.length != 0
              //   ? (document.querySelector("#par-empty-data").style.display = "block")
              //   : null;
              btnRemoveProduct = document.querySelectorAll("#remove-prod");
              btnRemoveProduct === null || btnRemoveProduct === void 0 ? void 0 : btnRemoveProduct.forEach(function (item) {
                item.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
                  var itemId;
                  return _regeneratorRuntime().wrap(function _callee12$(_context12) {
                    while (1) switch (_context12.prev = _context12.next) {
                      case 0:
                        itemId = item.dataset.id;
                        _context12.next = 3;
                        return Kart.removeItem(itemId);
                      case 3:
                        _context12.next = 5;
                        return Kart.getItemNumber();
                      case 5:
                        document.querySelector("#cart-item-count").innerHTML = _context12.sent;
                      case 6:
                      case "end":
                        return _context12.stop();
                    }
                  }, _callee12);
                })));
              });
            case 25:
            case "end":
              return _context13.stop();
          }
        }, _callee13);
      }));
      function kartRenderItems() {
        return _kartRenderItems.apply(this, arguments);
      }
      return kartRenderItems;
    }()
    /**
     *
     * @param {*} item
     */
  }, {
    key: "RenderModal",
    value: function () {
      var _RenderModal = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(item, qte) {
        var price, fraisDivers, fraisDossier, fraisPort, html;
        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return Kart.calculTotalPrice();
            case 2:
              price = _context14.sent;
              _context14.next = 5;
              return Kart.addFraisDivers();
            case 5:
              fraisDivers = _context14.sent;
              fraisDossier = parseFloat(fraisDivers.frais_dossier);
              fraisPort = parseFloat(fraisDivers.frais_port);
              _context14.t0 = "\n        <div class=\"body-modal-detail\">\n            <img src=\"/images/produits/".concat(item.media, "\" alt=\"\" srcset=\"\" />\n            <div class=\"info-product\">\n            <h4>").concat(item.pro_libelle, "</h4>\n            <div class=\"product-montant\">").concat(item.pad_ttc.toFixed(2), "\u20AC</div>\n            <div class=\"product-quantity\">Quantit\xE9 : <span> ").concat(qte, " </span></div>\n            </div>\n        </div>\n        <div class=\"modal-body-commande\">\n            <h5>Il y a ");
              _context14.next = 11;
              return Kart.getItemNumber();
            case 11:
              _context14.t1 = _context14.sent;
              html = _context14.t0.concat.call(_context14.t0, _context14.t1, " articles dans votre panier.</h5>\n            <div class=\"sous-total\">\n                <span class=\"sous-total-titre\">Sous-total :</span>\n                <span class=\"sous-total-montant\">").concat(price.kartProductPrice.toFixed(2), " \u20AC</span>\n            </div>\n            <div class=\"transport\">\n                <span class=\"transport-titre\">transport:</span>\n                <span class=\"transport-montant\">").concat(parseFloat(fraisPort).toFixed(2), " \u20AC</span>\n            </div>\n            <div class=\"transport\">\n                <span class=\"transport-titre\">frais dossier:</span>\n                <span class=\"transport-montant\">").concat(parseFloat(fraisDossier).toFixed(2), " \u20AC</span>\n            </div>\n            <div class=\"total\">\n                <span class=\"total-titre\">total:</span>\n                <span class=\"total-montant\">").concat(price.totalPrice.toFixed(2), " \u20AC</span>\n            </div>\n            <div class=\"btn-achat\">\n                <button class=\"continuer\"  data-bs-dismiss=\"modal\"\n                aria-label=\"Close\">Continuer mes achats</button>\n                <a href=\"/panier/#page-panier\" class=\"finaliser\">\n                    <i class=\"fa fa-check icon-succes\"></i>\n                    <span>Finaliser le devis</span>\n                </a>\n            </div>\n        </div>\n        ");
              document.querySelector("#myModal .body-modal").innerHTML = html;
              document.querySelector("#modal-btn-close").addEventListener("click", function () {
                document.querySelector("#myModal .body-modal").innerHTML = "<img src=\"/images/loader.gif\" alt=\"\" />";
              });
            case 15:
            case "end":
              return _context14.stop();
          }
        }, _callee14);
      }));
      function RenderModal(_x7, _x8) {
        return _RenderModal.apply(this, arguments);
      }
      return RenderModal;
    }()
  }, {
    key: "RenderMaxQteModal",
    value: function () {
      var _RenderMaxQteModal = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
        var price, fraisDivers, fraisDossier, fraisPort, html;
        return _regeneratorRuntime().wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return Kart.calculTotalPrice();
            case 2:
              price = _context15.sent;
              _context15.next = 5;
              return Kart.addFraisDivers();
            case 5:
              fraisDivers = _context15.sent;
              fraisDossier = parseFloat(fraisDivers.frais_dossier);
              fraisPort = parseFloat(fraisDivers.frais_port);
              html = /*html*/"\n        <div class=\"modal-body-commande\">\n            <h5>Vous avez d\xE9j\xE0 ajout\xE9 au panier le quantit\xE9 disponible pour cet article</h5>\n        </div>\n        ";
              document.querySelector("#myModal .body-modal").innerHTML = html;
            case 10:
            case "end":
              return _context15.stop();
          }
        }, _callee15);
      }));
      function RenderMaxQteModal() {
        return _RenderMaxQteModal.apply(this, arguments);
      }
      return RenderMaxQteModal;
    }()
  }, {
    key: "RenderMaxQteUpdateModal",
    value: function RenderMaxQteUpdateModal() {
      var myModal = new bootstrap.Modal(document.querySelector("#maxQteModal"), {
        keyboard: false
      });
      myModal.show();
    }
  }, {
    key: "RenderDeleteModal",
    value: function RenderDeleteModal() {
      var removeModal = new bootstrap.Modal(document.querySelector("#removeModel"), {
        keyboard: false
      });
      removeModal.show();
    }
  }, {
    key: "HideDeleteModal",
    value: function HideDeleteModal() {
      var removeModal = document.querySelector("#removeModel");
      var modal = bootstrap.Modal.getInstance(removeModal);
      modal.hide();
    }
  }]);
  return Kart;
}();
_defineProperty(Kart, "items", []);