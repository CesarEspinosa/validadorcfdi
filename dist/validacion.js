"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cadenaOriginal = _interopRequireDefault(require("./cadenaOriginal"));
var _xmlParser = require("./xmlParser");
var _certificado = require("./certificado");
var _nodeForge = _interopRequireDefault(require("node-forge"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Converts given string to a SHA256 digest
 *
 * @param {string} toHash - String to be hashed
 * @return {string} sha256Digest
 */
function sha256Digest() {
  var toHash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var md = _nodeForge["default"].md.sha256.create();
  md.update(toHash, 'utf8');
  return md;
}

/**
 * Returns certificate object from a base 64 encoded certificate
 *
 * @param {string} certString - Base 64 string
 * @return {object} forge certificate object
 */
function getCertificateFromBase64() {
  var certString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  if (!certString) return false;
  try {
    // base64-decode DER bytes
    var certDerBytes = _nodeForge["default"].util.decode64(certString);
    // parse DER to an ASN.1 object
    var obj = _nodeForge["default"].asn1.fromDer(certDerBytes);
    // convert ASN.1 object to forge certificate object
    var cert = _nodeForge["default"].pki.certificateFromAsn1(obj);
    return cert;
  } catch (e) {
    return false;
  }
}

/**
 * Returns public key from a base 64 encoded certificate
 *
 * @param {string} certString - Base 64 string
 * @return {string} Public Key
 */
function getPKFromBase64() {
  var certString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var cert = getCertificateFromBase64(certString);
  if (!cert) return false;
  // get forge public key object
  return cert.publicKey;
}

/**
 * Returns readable certificate from a DER (.cer) file
 *
 * @param {string} der - DER Certificate
 * @return {string} Public Key
 */
function getCertificateFromDer() {
  var der = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  if (!der) return false;
  try {
    var asnObj = _nodeForge["default"].asn1.fromDer(der);
    var asn1Cert = _nodeForge["default"].pki.certificateFromAsn1(asnObj);
    // PEM -> forge.pki.publicKeyToPem(asn1Cert.publicKey)
    return asn1Cert;
  } catch (e) {
    return false;
  }
}

/**
 * Returns Certificado Number (ID) from a given factura
 *
 * @param {object} factura - libxml object
 * @return {string} ID NoCertificadoSAT
 */
function getCertificadoSATFromFactura(factura) {
  var timbreFiscalDigital = factura.get('//tfd:TimbreFiscalDigital', {
    tfd: 'http://www.sat.gob.mx/TimbreFiscalDigital'
  });
  if (!timbreFiscalDigital) {
    return false;
  }
  return timbreFiscalDigital.attr('NoCertificadoSAT') && timbreFiscalDigital.attr('NoCertificadoSAT').value() || false;
}

/**
 * Certificates contain pairs, should remove first part of pair
 *
 * @param {string} serialNumber - certificate serial number to clean
 * @return {string} cleaned serial number
 */
function cleanCertificateSerialNumber() {
  var serialNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var cleanedCert = '';
  for (var i = 1; i < serialNumber.length; i += 2) {
    cleanedCert += serialNumber[i];
  }
  return cleanedCert;
}

/**
 * Clean carriage returns from a string
 *
 * @param {string} str - string to clean
 * @return {string} clean string
 */
function cleanSpecialCharacters() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  str = str.trim();
  return str.replace(/[\s\n\r]+/g, '');
}

/**
 * Returns basic factura and certificate information as an object
 * Note: this doesn't validate sellos
 *
 * @param {string} factura - Factura to validate
 * @param {object} parsedFactura - libxml object of parsedFactura
 * @param {string} certificado - DER Certificate (.cer file)
 * @return {object} factura information
 */
function composeResults() {
  return _composeResults.apply(this, arguments);
}
/**
 * Validates Sello Emisor with certificate
 *
 * @param {string} facturaXML - Factura to validate
 * @param {string} certificado - Base64 encoded certificate
 * @param {string} selloCFDI - SelloSAT from factura
 * @param {string} version - Factura version ('3.3' || '4.0')
 * @return {boolean} whether Sello Emisor is valid given the certificate
 */
function _composeResults() {
  _composeResults = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var facturaXML,
      parsedFactura,
      certificado,
      result,
      factura,
      cfdi3Namespace,
      cfdi4Namespace,
      comprobante,
      timbreFiscalDigital,
      cadenaOriginal,
      cadenaOriginalCC,
      _args = arguments;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          facturaXML = _args.length > 0 && _args[0] !== undefined ? _args[0] : '';
          parsedFactura = _args.length > 1 && _args[1] !== undefined ? _args[1] : '';
          certificado = _args.length > 2 && _args[2] !== undefined ? _args[2] : '';
          result = {
            valid: false,
            cadenaOriginal: {},
            cadenaOriginalCC: {}
          };
          if (!(!facturaXML || !certificado)) {
            _context.n = 1;
            break;
          }
          result.message = 'Factura o certificado inexistente';
          return _context.a(2, result);
        case 1:
          factura = parsedFactura || (0, _xmlParser.parseXML)(facturaXML);
          if (!(!factura || factura.toString() === '')) {
            _context.n = 2;
            break;
          }
          result.message = 'Factura no pudo ser leída';
          return _context.a(2, result);
        case 2:
          cfdi3Namespace = {
            cfdi: 'http://www.sat.gob.mx/cfd/3'
          };
          cfdi4Namespace = {
            cfdi: 'http://www.sat.gob.mx/cfd/4'
          };
          comprobante = factura.get('//cfdi:Comprobante', cfdi3Namespace) || factura.get('//cfdi:Comprobante', cfdi4Namespace);
          if (comprobante) {
            _context.n = 3;
            break;
          }
          result.message = 'Factura no contiene nodo Comprobante';
          return _context.a(2, result);
        case 3:
          result.version = comprobante.attr('Version') && comprobante.attr('Version').value() || '';
          result.certificadoEmisor = comprobante.attr('Certificado') && comprobante.attr('Certificado').value() || '';
          result.certificadoEmisor = cleanSpecialCharacters(result.certificadoEmisor);
          timbreFiscalDigital = factura.get('//tfd:TimbreFiscalDigital', {
            tfd: 'http://www.sat.gob.mx/TimbreFiscalDigital'
          });
          if (timbreFiscalDigital) {
            _context.n = 4;
            break;
          }
          result.message = 'Factura no contiene Timbre Fiscal Digital';
          return _context.a(2, result);
        case 4:
          result.UUID = timbreFiscalDigital.attr('UUID') && timbreFiscalDigital.attr('UUID').value().toUpperCase() || '';
          result.selloCFD = timbreFiscalDigital.attr('SelloCFD') && timbreFiscalDigital.attr('SelloCFD').value() || '';
          result.selloCFD = cleanSpecialCharacters(result.selloCFD);
          result.selloSAT = timbreFiscalDigital.attr('SelloSAT') && timbreFiscalDigital.attr('SelloSAT').value() || '';
          result.selloSAT = cleanSpecialCharacters(result.selloSAT);
          _context.n = 5;
          return _cadenaOriginal["default"].generaCadena(facturaXML, result.version);
        case 5:
          cadenaOriginal = _context.v;
          result.cadenaOriginal.cadena = cadenaOriginal;
          result.cadenaOriginal.sha = sha256Digest(cadenaOriginal).digest().toHex();
          result.cadenaOriginal.certificadoUsado = comprobante.attr('NoCertificado') && comprobante.attr('NoCertificado').value() || '';
          result.cadenaOriginal.certificadoReportado = cleanCertificateSerialNumber(getCertificateFromBase64(result.certificadoEmisor).serialNumber);
          _context.n = 6;
          return _cadenaOriginal["default"].generaCadenaOriginalCC(facturaXML);
        case 6:
          cadenaOriginalCC = _context.v;
          result.cadenaOriginalCC.cadena = cadenaOriginalCC;
          result.cadenaOriginalCC.sha = sha256Digest(cadenaOriginalCC).digest().toHex();
          result.cadenaOriginalCC.certificadoUsado = cleanCertificateSerialNumber(getCertificateFromDer(certificado).serialNumber);
          result.cadenaOriginalCC.certificadoReportado = timbreFiscalDigital.attr('NoCertificadoSAT') && timbreFiscalDigital.attr('NoCertificadoSAT').value() || '';
          if (!result.certificadoEmisor || !result.selloCFD || !result.selloSAT) {
            result.message = 'Factura no contiene certificados correctos';
          }
          return _context.a(2, result);
      }
    }, _callee);
  }));
  return _composeResults.apply(this, arguments);
}
function validaSelloEmisor(_x, _x2, _x3, _x4) {
  return _validaSelloEmisor.apply(this, arguments);
}
/**
 * Validates Sello SAT with certificate
 *
 * @param {string} facturaXML - Factura to validate
 * @param {string} certificadoSAT - DER Certificate (.cer file)
 * @param {string} selloSAT - SelloSAT from factura
 * @return {boolean} whether Sello SAT is valid given the certificate
 */
function _validaSelloEmisor() {
  _validaSelloEmisor = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(facturaXML, certificado, selloCFDI, version) {
    var cadenaOriginal, cadenaOriginalHash, publicKeyCert, signature, verificationResult, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          certificado = cleanSpecialCharacters(certificado);
          selloCFDI = cleanSpecialCharacters(selloCFDI);
          if (!(!facturaXML || !certificado || !selloCFDI || selloCFDI.length !== 344 && selloCFDI.length !== 172)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2, false);
        case 1:
          _context2.n = 2;
          return _cadenaOriginal["default"].generaCadena(facturaXML, version);
        case 2:
          cadenaOriginal = _context2.v;
          if (cadenaOriginal) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, false);
        case 3:
          cadenaOriginalHash = sha256Digest(cadenaOriginal);
          publicKeyCert = getPKFromBase64(certificado);
          signature = _nodeForge["default"].util.decode64(selloCFDI);
          if (!(!publicKeyCert || !signature)) {
            _context2.n = 4;
            break;
          }
          return _context2.a(2, false);
        case 4:
          _context2.p = 4;
          verificationResult = publicKeyCert.verify(cadenaOriginalHash.digest().bytes(), signature);
          _context2.n = 6;
          break;
        case 5:
          _context2.p = 5;
          _t = _context2.v;
          return _context2.a(2, false);
        case 6:
          return _context2.a(2, verificationResult);
      }
    }, _callee2, null, [[4, 5]]);
  }));
  return _validaSelloEmisor.apply(this, arguments);
}
function validaSelloSAT(_x5, _x6, _x7) {
  return _validaSelloSAT.apply(this, arguments);
}
/**
 * Checks that a factura is valid and returns all related information
 *
 * @param {string} facturaXML - Factura to validate
 * @param {string} certificadoSAT - Optional DER Certificate (.cer file)
 * @return {object} factura information and validation result
 */
function _validaSelloSAT() {
  _validaSelloSAT = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(facturaXML, certificadoSAT, selloSAT) {
    var cadenaOriginalCC, certificateDer, publicKeyCert, signature, cadenaOriginalHash, verificationResult, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          if (!(!facturaXML || !certificadoSAT || !selloSAT || selloSAT.length !== 344 && selloSAT.length !== 172)) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, false);
        case 1:
          _context3.n = 2;
          return _cadenaOriginal["default"].generaCadenaOriginalCC(facturaXML);
        case 2:
          cadenaOriginalCC = _context3.v;
          if (cadenaOriginalCC) {
            _context3.n = 3;
            break;
          }
          return _context3.a(2, false);
        case 3:
          certificateDer = getCertificateFromDer(certificadoSAT);
          publicKeyCert = certificateDer && certificateDer.publicKey;
          signature = _nodeForge["default"].util.decode64(selloSAT);
          if (!(!publicKeyCert || !signature)) {
            _context3.n = 4;
            break;
          }
          return _context3.a(2, false);
        case 4:
          cadenaOriginalHash = sha256Digest(cadenaOriginalCC);
          _context3.p = 5;
          verificationResult = publicKeyCert.verify(cadenaOriginalHash.digest().bytes(), signature);
          _context3.n = 7;
          break;
        case 6:
          _context3.p = 6;
          _t2 = _context3.v;
          return _context3.a(2, false);
        case 7:
          return _context3.a(2, verificationResult);
      }
    }, _callee3, null, [[5, 6]]);
  }));
  return _validaSelloSAT.apply(this, arguments);
}
function validaFactura(_x8) {
  return _validaFactura.apply(this, arguments);
}
function _validaFactura() {
  _validaFactura = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(facturaXML) {
    var certificadoSAT,
      factura,
      id,
      result,
      validaSelloEmisorResult,
      validaSelloSATResult,
      _args4 = arguments,
      _t3;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          certificadoSAT = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : '';
          // Parse factura
          factura = (0, _xmlParser.parseXML)(facturaXML);
          if (certificadoSAT) {
            _context4.n = 5;
            break;
          }
          id = getCertificadoSATFromFactura(factura);
          _context4.p = 1;
          _context4.n = 2;
          return (0, _certificado.downloadCertificateById)(id);
        case 2:
          certificadoSAT = _context4.v;
          _context4.n = 4;
          break;
        case 3:
          _context4.p = 3;
          _t3 = _context4.v;
          return _context4.a(2, {
            valid: false,
            message: 'Certificado no pudo ser descargado del portal del SAT',
            cadenaOriginal: {},
            cadenaOriginalCC: {}
          });
        case 4:
          certificadoSAT = certificadoSAT.toString('binary');
        case 5:
          _context4.n = 6;
          return composeResults(facturaXML, factura, certificadoSAT);
        case 6:
          result = _context4.v;
          if (!result.message) {
            _context4.n = 7;
            break;
          }
          return _context4.a(2, result);
        case 7:
          _context4.n = 8;
          return validaSelloEmisor(facturaXML, result.certificadoEmisor, result.selloCFD, result.version);
        case 8:
          validaSelloEmisorResult = _context4.v;
          result.validaSelloEmisorResult = validaSelloEmisorResult;
          _context4.n = 9;
          return validaSelloSAT(facturaXML, certificadoSAT, result.selloSAT);
        case 9:
          validaSelloSATResult = _context4.v;
          result.validaSelloSATResult = validaSelloSATResult;
          result.valid = validaSelloEmisorResult && validaSelloSATResult;
          return _context4.a(2, result);
      }
    }, _callee4, null, [[1, 3]]);
  }));
  return _validaFactura.apply(this, arguments);
}
var _default = exports["default"] = {
  readFactura: composeResults,
  validaSelloEmisor: validaSelloEmisor,
  validaSelloSAT: validaSelloSAT,
  validaFactura: validaFactura
};