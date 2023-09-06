"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var button1 = document.querySelector(".btn-tab-1");
var button2 = document.querySelector(".btn-tab-2");
// const button3 = document.querySelector(".btn-tab-3");
// const button4 = document.querySelector(".btn-tab-4");

var lines = document.querySelector(".lines");
var btnAdd = document.querySelector(".btn-add-taille");
var btns_delete = document.querySelectorAll(".delete");
var pro_libelle = document.querySelector(".pro-libelle");
var pro_ref = document.querySelector(".pro-ref");
var pro_poids = document.querySelector(".pro-poids");
var pro_description = document.querySelector(".pro-description");
// const pro_details = document.querySelector(".pro-details");
var collect = document.querySelector(".pro-new-collect");
var avant = document.querySelector(".pro-en-avant");
var statut = document.querySelector(".pro-statut");
var selectCategorie = document.querySelector(".select-categorie");
var categorieParent = document.querySelector(".accueil");
var listCat = document.querySelector(".cat-select");
var ht = document.querySelector(".tar-ht");
var ttc = document.querySelector(".tar-ttc");
var btnEnregistrer = document.querySelector(".update");
var qtyMax = document.querySelector(".qty-max");
var messageError = document.querySelector(".parent-message-danger");
var poidsMessageError = document.querySelector(".poidsedit-message-danger");
button1.addEventListener("click", function () {
  button1.classList.add("clicked");
  button2.classList.remove("clicked");
  // button3.classList.remove("clicked");
  // button4.classList.remove("clicked");
});

button2.addEventListener("click", function () {
  button1.classList.remove("clicked");
  button2.classList.add("clicked");
  // button3.classList.remove("clicked");
  // button4.classList.remove("clicked");
});

// button3.addEventListener("click", function () {
//   button1.classList.remove("clicked");
//   button3.classList.add("clicked");
//   button2.classList.remove("clicked");
//   button4.classList.remove("clicked");
// });

// button4.addEventListener("click", function () {
//   button1.classList.remove("clicked");
//   button4.classList.add("clicked");
//   button2.classList.remove("clicked");
//   button3.classList.remove("clicked");
// });

// traitement image
var inputDiv = document.querySelector(".images");
var inputImage = document.querySelector(".inputfile");
var output = document.querySelector(".image-container");
var updateInput = document.querySelector(".update_image");
var inputImageCover = document.querySelector(".file-cover");
var outputCover = document.querySelector(".output");
var imagesArray = [];
var imagesArrayCover = [];
inputImageCover.addEventListener("change", function () {
  var files = inputImageCover.files;
  imagesArrayCover[0] = files[0];
  displayCoverImage();
  displayCoverImage();
});
function displayCoverImage() {
  var images = "";
  imagesArrayCover.forEach(function (image, index) {
    images += "<div class=\"image\">\n                  <img src=\"".concat(URL.createObjectURL(image), "\" alt=\"image\">\n                  <span onclick=\"deleteCoverImage(").concat(index, ")\"><i class=\"fa-solid fa-xmark\"></i></span>\n                </div>");
  });
  outputCover.style.display = "flex";
  outputCover.innerHTML = images;
}
function validateInput(input) {
  if (input !== "") return true;else return false;
}
function deleteCoverImage(index) {
  imagesArrayCover.splice(index, 1);
  displayCoverImage();
  if (imagesArray.length === 0) {
    outputCover.style.display = "none";
  }
}
inputImage.addEventListener("change", function () {
  var files = inputImage.files;
  for (var i = 0; i < files.length; i++) {
    imagesArray.push(files[i]);
  }
  displayImages();
});
function displayImages() {
  var images = "";
  imagesArray.forEach(function (image, index) {
    images += "<div class=\"item\">\n                  <img src=\"".concat(URL.createObjectURL(image), "\" alt=\"image\">\n                  <span style=\"cursor:pointer;\" onclick=\"deleteImage(").concat(index, ")\"><i class=\"fa-solid fa-xmark\"></i></span>\n              \n                </div>");
  });
  // output.style.display = "flex";
  output.innerHTML = images;
}
function deleteImage(index) {
  imagesArray.splice(index, 1);
  displayImages();
}
function addTaille(taille) {
  var line = document.createElement("div");
  line.classList.add("quantity", "row");
  line.innerHTML = "\n     <div class=\"col-md-5 qty-left\">\n                      <div class=\"form-group\">\n                        <select\n                          class=\"form-select select-taille\"\n                          aria-label=\"Default select example\"\n                        >\n                      ".concat(taille.data.map(function (item) {
    return "<option value=".concat(item.tai_id, ">").concat(item.tai_libelle, "</option>");
  }), "\n                        </select>\n                      </div>\n                    </div>\n                    <div class=\"col-md-5 qty-right\">\n                      <div class=\"title-qty\"></div>\n                      <div class=\"form-group\">\n                        <input type=\"number\" value=\"0\" class=\"form-control\" />\n                      </div>\n                    </div>\n                    <div class=\"col-md-2 delete delete-add\">\n                      <span><i class=\"fa-solid fa-trash\"></i></span>\n                    </div>\n                  </div>\n  ");
  lines.appendChild(line);
}
btnAdd.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  var taille, btns_delete;
  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.next = 2;
        return axios.get("".concat(SITE_URL, "/admin/produits/add/tailles"), {
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          }
        });
      case 2:
        taille = _context2.sent;
        // console.log(taille);
        addTaille(taille);
        btns_delete = document.querySelectorAll(".delete-add");
        Array.from(btns_delete, function (item) {
          item.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var Myproduct, qty_id, qty;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  lines.removeChild(this.parentNode);
                  _context.next = 3;
                  return axios.get("".concat(SITE_URL, "/admin/produits/one/").concat(pro_ref.name), {
                    headers: {
                      "X-Requested-With": "XMLHttpRequest"
                    }
                  });
                case 3:
                  Myproduct = _context.sent;
                  qty_id = item.previousElementSibling.children[1].children[0].name;
                  _context.next = 7;
                  return axios["delete"]("".concat(SITE_URL, "/admin/produits/qty/").concat(Myproduct.data.pro_id, "/").concat(qty_id), {
                    headers: {
                      "X-Requested-With": "XMLHttpRequest"
                    }
                  });
                case 7:
                  qty = _context.sent;
                case 8:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          })));
        });
      case 6:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));
function listCategorie(categorie) {
  console.log(categorie);
  listCat.innerHTML = "\n  ".concat(categorie.data.map(function (item) {
    return "<option value=".concat(item.cat_id, ">").concat(item.cat_libelle, "</option>");
  }), "\n  ");
}
selectCategorie.addEventListener("change", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
  var categorie;
  return _regeneratorRuntime().wrap(function _callee3$(_context3) {
    while (1) switch (_context3.prev = _context3.next) {
      case 0:
        _context3.next = 2;
        return axios.get("".concat(SITE_URL, "/admin/produits/categorie/").concat(this.value), {
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          }
        });
      case 2:
        categorie = _context3.sent;
        listCategorie(categorie);
      case 4:
      case "end":
        return _context3.stop();
    }
  }, _callee3, this);
})));
var btn_delete_image = document.querySelectorAll(".btn-delete-image");
Array.from(btn_delete_image, function (item) {
  item.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    var Myproduct, media;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return axios.get("".concat(SITE_URL, "/admin/produits/one/").concat(pro_ref.name), {
            headers: {
              "X-Requested-With": "XMLHttpRequest"
            }
          });
        case 2:
          _context4.next = 4;
          return _context4.sent;
        case 4:
          Myproduct = _context4.sent;
          _context4.next = 7;
          return axios["delete"]("".concat(SITE_URL, "/admin/produits/media/").concat(Myproduct.data.pro_id, "/").concat(item.id), {
            headers: {
              "X-Requested-With": "XMLHttpRequest"
            }
          });
        case 7:
          media = _context4.sent;
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
          window.location.reload();
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
});
var btn_close_error = document.querySelector(".close-error");
var btn_close_error_poids = document.querySelector(".poids-error");
btn_close_error.addEventListener("click", function () {
  messageError.style.display = "none";
});
btn_close_error_poids.addEventListener("click", function () {
  poidsMessageError.style.display = "none";
});
btnEnregistrer.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
  var cat_id, pro_new_collect, pro_en_avant, pro_statut, tar_ht, tar_ttc, formWithImage, Myproduct, domEditableElement, editorInstance, data, produit, resultMedia, tarif, selectTailles, selectTailleExist, qty;
  return _regeneratorRuntime().wrap(function _callee9$(_context9) {
    while (1) switch (_context9.prev = _context9.next) {
      case 0:
        cat_id = listCat ? listCat.value : 1;
        pro_new_collect = collect.checked ? true : false;
        pro_en_avant = avant.checked ? true : false;
        pro_statut = statut.checked ? true : false;
        tar_ht = parseFloat(Number(ht.value.replace(",", ".")));
        tar_ttc = parseFloat(Number(ttc.value.replace(",", ".")));
        formWithImage = document.querySelector(".form-submit-image-edit");
        _context9.next = 9;
        return axios.get("".concat(SITE_URL, "/admin/produits/one/").concat(pro_ref.name), {
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          }
        });
      case 9:
        _context9.next = 11;
        return _context9.sent;
      case 11:
        Myproduct = _context9.sent;
        if (!(validateInput(pro_ref.value) && validateInput(pro_libelle.value) && validateInput(ht.value) && validateInput(ttc.value))) {
          _context9.next = 39;
          break;
        }
        if (typeof pro_poids.value == "string") {
          poidsMessageError.style.display = "flex";
        }
        poidsMessageError.style.display = "none";
        messageError.style.display = "none";
        domEditableElement = document.querySelector(".ck-editor__editable");
        editorInstance = domEditableElement.ckeditorInstance;
        data = {
          cat_id: cat_id,
          pro_ref: pro_ref.value,
          pro_libelle: pro_libelle.value,
          pro_description: editorInstance.getData(),
          // pro_details:pro_details.textContent,
          pro_new_collect: pro_new_collect,
          pro_en_avant: pro_en_avant,
          pro_statut: pro_statut,
          pro_poids: pro_poids.value
        };
        _context9.next = 21;
        return axios.put("".concat(SITE_URL, "/admin/produits/").concat(Myproduct.data.pro_id), data, {
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          }
        });
      case 21:
        produit = _context9.sent;
        // console.log(produit)

        imagesArrayCover.map( /*#__PURE__*/function () {
          var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(image) {
            var dataMedia, media;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  dataMedia = {
                    med_libelle: image.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(/\s/g, "").replaceAll(/[~`!@#$%^&*()+={}\[\];:\'\"<>,\/\\\?_']/g, ""),
                    med_ressource: image.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replaceAll(/\s/g, "").replaceAll(/[~`!@#$%^&*()+={}\[\];:\'\"<>,\/\\\?_']/g, "")
                  };
                  _context5.next = 3;
                  return axios.put("".concat(SITE_URL, "/admin/produits/media/").concat(Myproduct.data.pro_id, "/").concat(inputImageCover.id), dataMedia, {
                    headers: {
                      "X-Requested-With": "XMLHttpRequest"
                    }
                  });
                case 3:
                  media = _context5.sent;
                case 4:
                case "end":
                  return _context5.stop();
              }
            }, _callee5);
          }));
          return function (_x) {
            return _ref6.apply(this, arguments);
          };
        }());
        resultMedia = [];
        imagesArray.map( /*#__PURE__*/function () {
          var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(image) {
            var dataMedia, media;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  dataMedia = {
                    med_libelle: image.name.replaceAll(/\s/g, "").replaceAll(/[~`!@#$%^&*()+={}\[\];:\'\"<>,\/\\\?_]/g, ""),
                    // .replaceAll(
                    //   /[àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]/g,
                    //   ""
                    // ),
                    med_ressource: image.name.replaceAll(/\s/g, "").replaceAll(/[~`!@#$%^&*()+={}\[\];:\'\"<>,\/\\\?_]/g, ""),
                    // .replaceAll(
                    //   /[àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]/g,
                    //   ""
                    // ),
                    med_cover: false
                  };
                  _context6.next = 3;
                  return axios.post("".concat(SITE_URL, "/admin/produits/media/").concat(Myproduct.data.pro_id), dataMedia, {
                    headers: {
                      "X-Requested-With": "XMLHttpRequest"
                    }
                  });
                case 3:
                  media = _context6.sent;
                  if (!media.data.med_ressource) {
                    _context6.next = 6;
                    break;
                  }
                  return _context6.abrupt("return", resultMedia.push(media.data.msgMedia));
                case 6:
                case "end":
                  return _context6.stop();
              }
            }, _callee6);
          }));
          return function (_x2) {
            return _ref7.apply(this, arguments);
          };
        }());
        _context9.next = 27;
        return axios.put("".concat(SITE_URL, "/admin/produits/tarif/").concat(Myproduct.data.pro_id), {
          tar_ht: tar_ht,
          tar_ttc: tar_ttc
        }, {
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          }
        });
      case 27:
        tarif = _context9.sent;
        selectTailles = document.querySelectorAll(".select-taille");
        selectTailleExist = document.querySelectorAll(".select-taille-exist");
        Array.from(selectTailles, /*#__PURE__*/function () {
          var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(item) {
            var dataselect;
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  dataselect = {
                    tai_id: item.value,
                    qua_nbre: parseInt(item.parentNode.parentNode.parentNode.children[1].children[1].children[0].value)
                  };
                  _context7.next = 3;
                  return axios.post("".concat(SITE_URL, "/admin/produits/qty/").concat(Myproduct.data.pro_id), dataselect, {
                    headers: {
                      "X-Requested-With": "XMLHttpRequest"
                    }
                  });
                case 3:
                  qty = _context7.sent;
                case 4:
                case "end":
                  return _context7.stop();
              }
            }, _callee7);
          }));
          return function (_x3) {
            return _ref8.apply(this, arguments);
          };
        }());
        Array.from(selectTailleExist, /*#__PURE__*/function () {
          var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(item) {
            var dataselect, qty;
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  dataselect = {
                    tai_id: item.value,
                    qua_nbre: parseInt(item.parentNode.parentNode.parentNode.children[1].children[1].children[0].value)
                  };
                  _context8.next = 3;
                  return axios.put("".concat(SITE_URL, "/admin/produits/qty/").concat(Myproduct.data.pro_id), dataselect, {
                    headers: {
                      "X-Requested-With": "XMLHttpRequest"
                    }
                  });
                case 3:
                  qty = _context8.sent;
                case 4:
                case "end":
                  return _context8.stop();
              }
            }, _callee8);
          }));
          return function (_x4) {
            return _ref9.apply(this, arguments);
          };
        }());

        // const message = document.querySelector(".parent-message");

        btnEnregistrer.setAttribute("disabled", "true");
        btnEnregistrer.style.backgroundColor = "#eee";
        btnEnregistrer.style.cursor = "not-allowed";
        messageError.style.display = "none";
        formWithImage.submit();

        // window.location.reload();
        _context9.next = 40;
        break;
      case 39:
        messageError.style.display = "flex";
      case 40:
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
        // btnEnregistrer.removeAttribute("disabled");
        // btnEnregistrer.style.cursor = "pointer";
      case 41:
      case "end":
        return _context9.stop();
    }
  }, _callee9);
})));

//delete taille
Array.from(btns_delete, function (item) {
  item.addEventListener("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
    var Myproduct, qty_id, qty;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          lines.removeChild(this.parentNode);
          _context10.next = 3;
          return axios.get("".concat(SITE_URL, "/admin/produits/one/").concat(pro_ref.name), {
            headers: {
              "X-Requested-With": "XMLHttpRequest"
            }
          });
        case 3:
          Myproduct = _context10.sent;
          qty_id = item.previousElementSibling.children[1].children[0].name;
          _context10.next = 7;
          return axios["delete"]("".concat(SITE_URL, "/admin/produits/qty/").concat(Myproduct.data.pro_id, "/").concat(qty_id), {
            headers: {
              "X-Requested-With": "XMLHttpRequest"
            }
          });
        case 7:
          qty = _context10.sent;
          window.location.reload();
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
          });
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee10, this);
  })));
});