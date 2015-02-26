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

  // Gulp has auto-injected the content below: 

// Created by Jim Buck on 2/16/2015.

var Enum = function(){};

// Provides an easy method to check if a flag is set.
Object.defineProperty(Enum, 'hasFlag', {
  value: function (enumValue, flag) {
      return (enumValue & flag) == flag;
    }
});

// Used to create a new Enum.
Enum.extend = function (obj) {

  // Initialize our new enum object.
  var newEnum = new Enum();

  // Convert strings or an array of strings to an object.
  if (typeof obj === 'string' || obj instanceof Array) {
    var args = typeof obj === 'string' ? [].slice.call(arguments) : obj;
    obj = {};
    for (var i in args) {
      obj[args[i]] = i;
    }
  }

  // Specify the string/integer values.
  for (var field in obj) {
    var txt = isNaN(field) ? field : obj[field];
    var val = parseInt(isNaN(field) ? obj[field] : field);

    Object.defineProperty(newEnum, txt, {
      value: val
    });
    
    
    Object.defineProperty(newEnum, val, {
      value: txt,
      enumerable: true
    });
  }

  return newEnum;
};
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype

var initializing = false;
var fnTest = /xyz/.test(function () {
  xyz;
}) ? /\bsuper\b/ : /.*/;

// The base Class implementation (does nothing)
var Class = function () {
};

// Create a new Class that inherits from this class
Class.extend = function (prop) {
  var _super = this.prototype;

  // Translate the constructor they passed in to an init function.
  if (typeof prop.constructor === 'function') {
    prop._ctor = prop.constructor;
    delete prop.constructor;
  }

  // Instantiate a base class (but only create the instance,
  // don't run the init constructor)
  initializing = true;
  var prototype = new this();
  initializing = false;

  // Copy the properties over onto the new prototype
  for (var name in prop) {
    // Check if we're overwriting an existing function
    (typeof prop[name] == "function" &&
    typeof _super[name] == "function" && fnTest.test(prop[name])) ?
      prototype[name] = (function (name, fn) {
        return function () {
          var tmp = this.super;

          // Add a new .super() method that is the same method
          // but on the super-class
          this.super = _super[name];

          // The method only need to be bound temporarily, so we
          // remove it when we're done executing
          var ret = fn.apply(this, arguments);
          this.super = tmp;

          return ret;
        };
      })(name, prop[name])
      : prototype[name] = prop[name];
  }

  // The dummy class constructor
  function _Class() {

    // All construction is actually done in the constructor method (which we secretly renamed _ctor)
    if (!initializing && this._ctor) {
      this._ctor.apply(this, arguments);
    }
  }

  // Populate our constructed prototype object
  _Class.prototype = prototype;

  // Enforce the constructor to be what we expect
  _Class.prototype.constructor = Class;

  // And make this class extendable
  _Class.extend = arguments.callee;

  return _Class;
};
  
  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return {
    Enum: Enum,
    Class: Class
  };
}));