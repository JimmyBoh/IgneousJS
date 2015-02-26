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