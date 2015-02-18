

// Created by Jim Buck on 2/16/2015.

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