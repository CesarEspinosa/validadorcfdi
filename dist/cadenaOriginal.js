"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _libxslt = _interopRequireDefault(require("libxslt"));
var _xmlParser = require("./xmlParser");
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Converts a callback to a promise, used for async/await
 *
 * @function
 * @param {...*} args - Arguments
 * @return {Promise} Callback converted to promise
 */
function callbackToPromise(method) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return new Promise(function (resolve, reject) {
    return method.apply(void 0, args.concat([function (err, result) {
      return err ? reject(err) : resolve(result);
    }]));
  });
}

/**
 * Sanitizes an input according to SAT rules
 * Converts tabs, carriage returns and line breaks to spaces
 * Removes leading and trailing spaces
 *
 * @param {string} value - String to be sanitized
 * @return {string} Sanitized response
 */
function sanitizeInput() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return value.replace(/\r?\n|\r|\t|(\s)+/g, ' ').trim();
}

/**
 * Returns the appropriate cadena path depending on the
 * CFDI version provided
 *
 * @param {string} version - CFDI Version
 * @return {string} resolved path
 */
function getCadenaPathFromVersion() {
  var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '3.3';
  var cadena33Path = _path["default"].join(__dirname, 'xslt', 'cfd', '3', 'cadenaoriginal_3_3', 'cadenaoriginal_3_3.xslt');
  var cadena40Path = _path["default"].join(__dirname, 'xslt', 'cfd', '4', 'cadenaoriginal_4_0', 'cadenaoriginal_4_0.xslt');
  if (version === '4.0') {
    return cadena40Path;
  }
  return cadena33Path;
}

/**
 * Obtains the values of the cadena original del complemento as specified by SAT
 *
 * @param {string} factura - libxml Object
 * @return {Array} cadenaOriginal of complemento
 */
function getCCValues() {
  var factura = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var cadenaOriginal = [];
  if (!factura) return cadenaOriginal;
  var timbreFiscalDigital = factura.get('//tfd:TimbreFiscalDigital', {
    tfd: 'http://www.sat.gob.mx/TimbreFiscalDigital'
  });

  // 1. Version
  var version = timbreFiscalDigital.attr('Version') && timbreFiscalDigital.attr('Version').value() || '';
  if (version) cadenaOriginal.push(version);
  // 2. UUID
  var UUID = timbreFiscalDigital.attr('UUID') && timbreFiscalDigital.attr('UUID').value() || '';
  if (UUID) cadenaOriginal.push(UUID);
  // 3. FechaTimbrado
  var fechaTimbrado = timbreFiscalDigital.attr('FechaTimbrado') && timbreFiscalDigital.attr('FechaTimbrado').value() || '';
  if (fechaTimbrado) cadenaOriginal.push(fechaTimbrado);
  // 4. RfcProvCertif
  var rfcProvCertif = timbreFiscalDigital.attr('RfcProvCertif') && timbreFiscalDigital.attr('RfcProvCertif').value() || '';
  if (rfcProvCertif) cadenaOriginal.push(rfcProvCertif);
  // 5. Leyenda Optional
  var leyenda = timbreFiscalDigital.attr('Leyenda') && timbreFiscalDigital.attr('Leyenda').value() || '';
  if (leyenda) cadenaOriginal.push(leyenda);
  // 6. SelloCFD
  var selloCFD = timbreFiscalDigital.attr('SelloCFD') && timbreFiscalDigital.attr('SelloCFD').value() || '';
  if (selloCFD) cadenaOriginal.push(selloCFD);
  // 7. NoCertificadoSAT
  var noCertificado = timbreFiscalDigital.attr('NoCertificadoSAT') && timbreFiscalDigital.attr('NoCertificadoSAT').value() || '';
  if (noCertificado) cadenaOriginal.push(noCertificado);
  return cadenaOriginal.map(sanitizeInput);
}
var _default = exports["default"] = {
  /**
   * Generate a Cadena Original from a given XML string
   *
   * @async
   * @param  {string}  facturaXML - The XML string of a 3.3 factura
   * @return {Promise<string>} Cadena Original string result
   */
  generaCadena: function () {
    var _generaCadena = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(facturaXML) {
      var version,
        parsedFile,
        cadena,
        _args = arguments,
        _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            version = _args.length > 1 && _args[1] !== undefined ? _args[1] : '3.3';
            if (facturaXML) {
              _context.n = 1;
              break;
            }
            return _context.a(2, false);
          case 1:
            _context.p = 1;
            _context.n = 2;
            return callbackToPromise(_libxslt["default"].parseFile, getCadenaPathFromVersion(version));
          case 2:
            parsedFile = _context.v;
            _context.n = 3;
            return new Promise(function (resolve, reject) {
              parsedFile.apply(facturaXML, function (err, transform) {
                return err ? reject(err) : resolve(transform);
              });
            });
          case 3:
            cadena = _context.v;
            return _context.a(2, cadena);
          case 4:
            _context.p = 4;
            _t = _context.v;
            return _context.a(2, false);
        }
      }, _callee, null, [[1, 4]]);
    }));
    function generaCadena(_x) {
      return _generaCadena.apply(this, arguments);
    }
    return generaCadena;
  }(),
  /**
   * Generate a Cadena Original from a given XML file path
   *
   * @async
   * @param  {string}  facturaPath - Path to the .xml file
   * @return {Promise<string>} Cadena Original string result
   */
  generaCadenaFile: function () {
    var _generaCadenaFile = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(facturaPath) {
      var version,
        parsedFile,
        cadena,
        _args2 = arguments,
        _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            version = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : '3.3';
            if (facturaPath) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, false);
          case 1:
            _context2.p = 1;
            _fs["default"].statSync(facturaPath);
            _context2.n = 2;
            return callbackToPromise(_libxslt["default"].parseFile, getCadenaPathFromVersion(version));
          case 2:
            parsedFile = _context2.v;
            _context2.n = 3;
            return new Promise(function (resolve, reject) {
              parsedFile.applyToFile(facturaPath, function (err, transform) {
                return err ? reject(err) : resolve(transform);
              });
            });
          case 3:
            cadena = _context2.v;
            return _context2.a(2, cadena);
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            return _context2.a(2, false);
        }
      }, _callee2, null, [[1, 4]]);
    }));
    function generaCadenaFile(_x2) {
      return _generaCadenaFile.apply(this, arguments);
    }
    return generaCadenaFile;
  }(),
  /**
   * Generate a Cadena Original del complemento from a given XML file path
   *
   * @param  {string}  facturaXML - The XML string of a 3.3 factura
   * @return {string} Cadena Original of Complemento string result
   */
  generaCadenaOriginalCC: function generaCadenaOriginalCC(facturaXML) {
    var factura = (0, _xmlParser.parseXML)(facturaXML);
    if (!factura) return false;
    var cadenaOriginal = getCCValues(factura);

    // Validate size and that all elements contain a truthy value
    if (cadenaOriginal.length < 6 || cadenaOriginal.some(function (element) {
      return !element;
    })) {
      return false;
    }

    // Build the resulting string
    return '||' + cadenaOriginal.join('|') + '||';
  }
};