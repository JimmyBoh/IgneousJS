/* IgneousJS
 * By Jim Buck http://jimmyboh.com/
 * MIT Licensed
 * Inspired by John Resig and TypeScript
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    var ig = factory();
    root.Enum = ig.Enum;
    root.Class = ig.Class;
  }
}(this, function () {

  // Gulp has auto-injected the content below: <%= contents %>
  
  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {
    Enum: Enum,
    Class: Class
  };
}));