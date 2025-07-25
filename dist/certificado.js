"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadCertificate = downloadCertificate;
exports.downloadCertificateById = downloadCertificateById;
var _nodeFetch = _interopRequireDefault(require("node-fetch"));
var _nodeCache = _interopRequireDefault(require("node-cache"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Initialize the cache
var cache = new _nodeCache["default"]();

/**
 * Performs a fetch operation to download content from the specified URL.
 * Used to properly mock tests
 *
 * @param {string} url - The URL to fetch content from.
 * @returns {Promise<Buffer>} A Promise that resolves with the content buffer if the fetch is successful.
 * @throws {Error} If the fetch operation fails or the response status is not OK.
 */
function performFetch(_x) {
  return _performFetch.apply(this, arguments);
}
/**
 * Downloads a certificate file from the specified URL.
 *
 * @param {object} url - The URLs of the certificate file to download.
 * @returns {Promise<Buffer>} A Promise that resolves with the certificate file content as a Buffer.
 * @throws {Error} If the download fails or the response status is not OK.
 */
function _performFetch() {
  _performFetch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(url) {
    var response, fileContent;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return (0, _nodeFetch["default"])(url);
        case 1:
          response = _context.v;
          if (response.ok) {
            _context.n = 2;
            break;
          }
          throw new Error("Failed to download certificate file. Status: ".concat(response.status));
        case 2:
          _context.n = 3;
          return response.buffer();
        case 3:
          fileContent = _context.v;
          return _context.a(2, fileContent);
      }
    }, _callee);
  }));
  return _performFetch.apply(this, arguments);
}
function downloadCertificate(_x2) {
  return _downloadCertificate.apply(this, arguments);
}
/**
 * Checks if a CER (Certificate) number is valid.
 *
 * @param {string} id - The CER number to validate.
 * @returns {boolean} true if the CER number is valid, false otherwise.
 */
function _downloadCertificate() {
  _downloadCertificate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(_ref) {
    var SAT,
      S3,
      fetchImplementation,
      SIX_MONTHS_IN_SECONDS,
      cachedResponse,
      fileContent,
      fileContentS3,
      _args2 = arguments,
      _t,
      _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          SAT = _ref.SAT, S3 = _ref.S3;
          fetchImplementation = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : performFetch;
          SIX_MONTHS_IN_SECONDS = 15768; // Check if the response is already cached
          cachedResponse = cache.get(SAT);
          if (!cachedResponse) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, cachedResponse);
        case 1:
          _context2.p = 1;
          _context2.n = 2;
          return fetchImplementation(SAT);
        case 2:
          fileContent = _context2.v;
          // Cache the response for 6 months
          cache.set(SAT, fileContent, SIX_MONTHS_IN_SECONDS);
          return _context2.a(2, fileContent);
        case 3:
          _context2.p = 3;
          _t = _context2.v;
          _context2.p = 4;
          _context2.n = 5;
          return fetchImplementation(S3);
        case 5:
          fileContentS3 = _context2.v;
          // The cache key is always the SAT URL
          cache.set(SAT, fileContentS3, SIX_MONTHS_IN_SECONDS);
          return _context2.a(2, fileContentS3);
        case 6:
          _context2.p = 6;
          _t2 = _context2.v;
          throw new Error("".concat(_t.message, ", ").concat(_t2.message));
        case 7:
          return _context2.a(2);
      }
    }, _callee2, null, [[4, 6], [1, 3]]);
  }));
  return _downloadCertificate.apply(this, arguments);
}
function validateCERNumber(id) {
  return /^[0-9]{20}$/.test(id);
}

/**
 * Generates URLs to obtaina a certificate from based on the provided ID.
 *
 * @param {string} id - The ID used to generate the certificate URL.
 * @returns {object} The generated certificates URL.
 */
function certificadoURL(id) {
  return {
    SAT: "https://rdc.sat.gob.mx/rccf/".concat(id.substring(0, 6), "/").concat(id.substring(6, 12), "/").concat(id.substring(12, 14), "/").concat(id.substring(14, 16), "/").concat(id.substring(16, 18), "/").concat(id, ".cer"),
    S3: "https://administracioncfdi-certificados.s3.amazonaws.com/".concat(id, ".cer")
  };
}

/**
 * Downloads a certificate file based on the provided ID.
 *
 * @param {string} id - The ID used to generate the certificate URL.
 * @param {function} downloader - The function responsible for downloading the certificate.
 * @returns {Promise<Buffer|boolean>} A Promise that resolves with the certificate file content as a Buffer if the CER number is valid, or false if the CER number is invalid.
 */
function downloadCertificateById(_x3) {
  return _downloadCertificateById.apply(this, arguments);
}
function _downloadCertificateById() {
  _downloadCertificateById = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(id) {
    var downloader,
      certificateUrl,
      _args3 = arguments;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          downloader = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : downloadCertificate;
          if (validateCERNumber(id)) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, false);
        case 1:
          certificateUrl = certificadoURL(id);
          return _context3.a(2, downloader(certificateUrl));
      }
    }, _callee3);
  }));
  return _downloadCertificateById.apply(this, arguments);
}