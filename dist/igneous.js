(function () {

  // // Created by Jim Buck on 2/16/2015.

var Enum = function(){};

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
  for (var name in obj) {
    newEnum[newEnum[name] = obj[name]] = name;
  }

  // Add a method to get the string 
  //   value in a "prettier" way.
  newEnum.toString = function (enumValue) {
    if(typeof enumValue === 'string'){
      if(isNaN(enumValue)){
        return enumValue;
      }

      return newEnum[parseInt(enumValue)];
    }
    
    return newEnum[enumValue];
  };

  return newEnum;
};

// Provides an easy method to check if a flag is set.
Enum.hasFlag = Enum.prototype.hasFlag = function (enumValue, flag) {
  return (enumValue & flag) == flag;
}
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype

var initializing = false;
var fnTest = /xyz/.test(function () {xyz;}) ? /\bsuper\b/ : /.*/;

// The base Class implementation (does nothing)
var Class = function () {};

// Create a new Class that inherits from this class
Class.extend = function (prop) {
  var _super = this.prototype;
  
  // Translate the constructor they passed in to an init function.
  if(prop.constructor != Object) {
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
    prototype[name] = typeof prop[name] == "function" &&
    typeof _super[name] == "function" && fnTest.test(prop[name]) ?
      (function (name, fn) {
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
      })(name, prop[name]) :
      prop[name];
  }

  // The dummy class constructor
  function Class() {
    // All construction is actually done in the constructor method (which we secretly renamed _ctor)
    if (!initializing && this._ctor) {
      this._ctor.apply(this, arguments);
    }
  }

  // Populate our constructed prototype object
  Class.prototype = prototype;

  // Enforce the constructor to be what we expect
  Class.prototype.constructor = Class;

  // And make this class extendable
  Class.extend = arguments.callee;

  return Class;
};
  
  if (typeof window !== 'undefined') {
    window.Enum = Enum;
    window.Class = Class;
  } else {
    module.exports.Enum = Enum;
    module.exports.Class = Class;
  }
})();