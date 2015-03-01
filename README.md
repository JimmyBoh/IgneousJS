# IgneousJS

A fully featured ES5 implementation for OOP in javascript for the browser or NodeJS!

[![NPM info](https://nodei.co/npm/igneousjs.png?downloads=true)](https://www.npmjs.com/package/igneousjs)


[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JimmyBoh/IgneousJS?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Build Status](https://travis-ci.org/JimmyBoh/IgneousJS.svg?branch=master)](https://travis-ci.org/JimmyBoh/IgneousJS)

The main goal of this library is to provide a small but powerful implementation of Object Oriented constructs in JavaScript (ES5). With ES6 on the way, this library is meant to bridge the gap by using as close to the correct syntax as possible.

## Installation:

### Node.js:

```sh
npm install --save igneousjs
```

You can then access it like so:

```js
var ig = require('igneousjs'),
  Enum = ig.Enum,
  Class = ig.Class;

// OR...

var Enum = require('igneousjs/enum');
var Class = require('igneousjs/class');
```

### Browser:

#### Using Bower:

```sh
bower install igneousjs --save
```

#### Traditional:

The distributable files are located [here](https://github.com/JimmyBoh/igneous/tree/master/dist).

Once it is loaded into the webpage, `Class` and `Enum` are available in the global scope!

Using AMD or CommonJS? No problem, it supports all types by default! (thanks to [UMD](https://github.com/umdjs/umd)) 

## Usage:

### Enums:

```js
var LightSwitch = Enum.extend('Off', 'On');

var kitchenLight = LightSwitch.On;

console.log(kitchenLight === LightSwitch.On);    // => true
console.log(kitchenLight);                       // => 1
console.log(LightSwitch[kitchenLight]);          // => 'On';
console.log(LightSwitch.toString(kitchenLight)); // => 'On';

for(var state in LightSwitch){
  if(kitchenLight == state) {
    console.log('The light is ' + LightSwitch[state]);
  }
}

var Direction = Enum.extend({
  'North': 1,
  'South': 2,
  'East':  4,
  'West':  8
});

var myHeading = Direction.North | Direction.East;

console.log(myHeading);            // => 5
console.log(Direction[myHeading]); // => undefined

console.log(Enum.hasFlag(myHeading, Direction.North)); // => true
console.log(Enum.hasFlag(myHeading, Direction.West));  // => false
```

### Classes:

```js
var Polygon = Class.extend({

  // Class constructor, ran during instantiation.
  constructor: function (height, width) { 
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  },

  // Class method, `this` being the class instance.
  sayName: function () {
    console.log('Hi, I am a', this.name + '.');
  }
});

var Rectangle = Polygon.extend({
  constructor: function (height, width) {
    this.super(height, width); // Call the parent method with `this.super`.
    this.name = 'Rectangle';
  },

  area: function () {
    return this.height * this.width;
  }
});

var Square = Rectangle.extend({
  constructor: function (length) {
    this.super(length, length);
    this.name = 'Square';
  },

  area: function () {
    return this.super();
  },

  sayName: function () {
    this.super(); // This super call overrides Polygon's.
    console.log('And I\'m way better than a Rectangle!');
  }
});

var p = new Polygon(4, 3);
var r = new Rectangle(2, 5);
var s = new Square(5);

p.sayName(); // => Hi, I am a Polygon.
r.sayName(); // => Hi, I am a Rectangle.
s.sayName(); // => Hi, I am a Square.
             //    And I'm way better than a Rectangle!

console.log(r.area())  // => 10
console.log(s.area()); // => 25

console.log(s instanceof Rectangle); // => true
console.log(r instanceof Square); // => false
```


## API

### Enum

#### `Enum.extend(obj)`
 - Returns: `Enum`,
 - Accepts: 
  - `obj`: `Object`
 
Creates a new enum from an object hash.

#### `Enum.extend(arr)`
 - Returns: `Enum`,
 - Accepts: 
  - `arr`: `Array`
 
Creates a new enum from an array of strings.

#### `Enum.extend(str1, str2, ...)`
 - Returns: `Enum`,
 - Accepts: 
  - `str`: `String` (one or many)
  
Creates a new enum from a set of strings.

#### `<enum>.toString(val)`
 - Returns: `String`,
 - Accepts: 
  - `val`: `Integer` (Enum value)
  
Returns the string value (key) based on the enum value (integer).

#### `Enum.hasFlag(enumValue, flagValue)`
 - Returns: `Boolean`,
 - Accepts: 
  - `enumValue`: `Integer` (Enum Value, your variable)
  - `flagValue`: `Integer` (Enum Value, the flag to check for)
  
Runs a bitwise comparison to see if the enum has a specified flag.

### Class

#### `Class.extend(obj)`
 - Returns: `Class`,
 - Accepts: 
  - `obj`: `Object`

Creates a new Class type. `obj` accepts a `constructor` function to act as the constructor. 
Each method will be run in the context of the class instance, exposing a `super` method that calls the parent instance of the current function.
 
See [John Resig's original blog post][2] for more information. 

#### `<class>.extend(obj)`
 - Returns: `Class`,
 - Accepts: 
  - `obj`: `Object`

This is the same as `Class.extend`, but may be called on any class implementation created using igneous.

## Inspired By:

**Simple JavaScript Inheritance**<br/>
By [John Resig][1]<br/>
MIT Licensed.<br/>
(Inspired by base2 and Prototype)<br/>
[Blog Post][2]<br/>


**TypeScript Enums**<br/>
By Microsoft (et al.)<br/>
[GitHub Project][3]<br/>
[TypeScriptLang.org][4]<br/>

## License:

See [LICENSE](https://github.com/JimmyBoh/igneous/blob/master/LICENSE) for more information.

[1]: http://ejohn.org/
[2]: http://ejohn.org/blog/simple-javascript-inheritance/
[3]: https://github.com/Microsoft/TypeScript
[4]: http://www.typescriptlang.org/