# igneous.js

A fully featured implementation for OOP in javascript (ES5) for the browser or NodeJS.

## Usage:

```js
// Enums #############################

var Color = Enum.extend('Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet');

var myFavoriteColor = Color.Yellow; // myFavoriteColor === 2
alert(Color[myFavoriteColor])       // will display "Yellow"

var Direction = Enum.extend({
  'North': 0,
  'South': 1,
  'East': 2,
  'West': 4
});

var myHeading = Direction.North | Direction.East; // Sets the value to NorthEast
alert(Enum.hasFlag(myHeading, Direction.North));  // Returns true!


// Classes ###########################

var Animal = Class.extend({
  init: function(name){
    this.name = name;
  },
  move(meters) {
    alert(this.name + ' moved ' + meters + 'm.');
  }
});

var Snake = Animal.extend({
 init: function(name){
   this._super(name)
 },
 move() {
   alert("Slithering...");
   this._super.move(5);
 }
});

var Horse = Animal.extend({
 init: function(name){
   this._super(name)
 },
 move() {
   alert("Galloping...");
   this._super.move(45);
 }
 
 var sam = new Snake("Sammy the Python");
 var tom = new Horse("Tommy the Palomino");
 
 sam.move();
 tom.move(34);
});

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

#### `<enum> Enum.extend(str1, str2, ...)`
 - Returns: `Enum`,
 - Accepts: 
  - `str`: `String` (one or many)
  
Creates a new enum from a set of strings.

#### `<enum>.toString(val)`
 - Returns: `String`,
 - Accepts: 
  - `val`: `Integer` (Enum value)
  
Returns the string value (key) based on the enum value (integer).

### Class

#### `Class.extend(obj)`
 - Returns: `Class`,
 - Accepts: 
  - `obj`: `Object`

Creates a new Class type. `obj` requires an `init` function to act as the constructor. 
Each method will be run in the context of the class instance, exposing a `_super` method that calls the parent instance of the current function.
 
See [John Resig's original blog post][2] for more information. 

#### `<class>.extend(obj)`
 - Returns: `Class`,
 - Accepts: 
  - `obj`: `Object`

This is the same as `Class.extend`, but may be called on any class implementation created using igneous.

## Inpsired By:

**Simple JavaScript Inheritance**
By [John Resig][1]
MIT Licensed.
(Inspired by base2 and Prototype)
[Blog Post][2]
 
**TypeScript Enums**
By Microsoft (et al.)
[GitHub Project][3]
[TypeScriptLang.org][4]

[1]: http://ejohn.org/
[2]: http://ejohn.org/blog/simple-javascript-inheritance/
[3]: https://github.com/Microsoft/TypeScript
[4]: http://www.typescriptlang.org/