"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseXML = parseXML;
var _libxmljs = _interopRequireDefault(require("libxmljs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * Parses an XML string to a libxml object
 *
 * @param {string} facturaXML - String with the factura
 * @return {object} libxml object
 */
function parseXML() {
  var facturaXML = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  if (!facturaXML) return false;
  var factura;
  try {
    factura = _libxmljs["default"].parseXml(facturaXML);
  } catch (e) {
    return false;
  }
  return factura;
}