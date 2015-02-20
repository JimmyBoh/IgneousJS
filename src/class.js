

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype

var initializing = false;
var fnTest = /xyz/.test(function () {xyz;}) ? /\bsuper\b/ : /.*/;

// The base Class implementation (does nothing)
var Class = function () {};

Class.MAX_STACK_TRACE = 10;

// Create a new Class that inherits from this class
Class.extend = function (prop) {
  var _super = this.prototype;
  
  // Translate the constructor they passed in to an init function.
  if(typeof prop.constructor === 'function') {
    prop._ctor = prop.constructor;
    delete prop.constructor;
  }

  //Convert the private fields they passed in to a secret object.
  if (typeof prop.private === 'object') {
    prop._prvt = prop.private;
    delete prop.private;
  }
  
  // Instantiate a base class (but only create the instance,
  // don't run the init constructor)
  initializing = true;
  var prototype = new this();
  initializing = false;
  
  // Copy the properties over onto the new prototype
  for (var name in prop) {
    // Check if we're overwriting an existing function
    if (typeof prop[name] == "function" &&
      typeof _super[name] == "function" && fnTest.test(prop[name])) {
      prototype[name] = (function (name, fn) {
        return function () {
          var tmp = this.super;

          // Add a new .super() method that is the same method
          // but on the super-class
          this.super = _super[name];

          // Set the internal flag to allow access to private fields.
          fn.isInternal = true;

          // The method only need to be bound temporarily, so we
          // remove it when we're done executing
          var ret = fn.apply(this, arguments);
          this.super = tmp;

          return ret;
        };
      })(name, prop[name]);
    } else {
      
      // Set the internal flag to allow access to private fields.
      if(typeof prop[name] == "function"){
        prop[name].isInternal = true;
      }
      
      prototype[name] = prop[name];
    }
  }

  // The dummy class constructor
  function _Class() {
    
    // All construction is actually done in the constructor method (which we secretly renamed _ctor)
    if (!initializing) {
      
      if(this._prvt) {

        function isInternal(args) {
          var maxLevels = Class.MAX_STACK_TRACE;
          
          var caller = args.callee;
          
          while(maxLevels-- > 0 && typeof caller !== 'undefined' && !caller.isInternal) {
            caller = caller.caller;
          }

          return caller.isInternal;
        }
        
        var createProperty = function (obj, prop, currentValue) {
          Object.defineProperty(obj, prop, {
            get: function () {
              if(isInternal(arguments))              
                return currentValue;
            },
            set: function (value) {
              if(isInternal(arguments)) {
                currentValue = value;
              }
            }
          });
        };
        
        for(var field in this._prvt) {
          var val = this._prvt[field];
          createProperty(this, field, val);
        }
        
        delete this._prvt;
      }
      
      if(this._ctor) {
        this._ctor.apply(this, arguments);
      }
    }
  }

  // Populate our constructed prototype object
  _Class.prototype = prototype;

  // Enforce the constructor to be what we expect
  _Class.prototype.constructor = Class;

  // And make this class extendable
  _Class.extend = arguments.callee;
  _Class.MAX_STACK_TRACE = Class.MAX_STACK_TRACE;

  return _Class;
};