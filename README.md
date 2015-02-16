# igneous.js

A fully featured ES5 implementation for OOP in javascript for the browser or NodeJS.

## Usage:

_Coming Soon!_

In the mean time please check out the tests for [enums](https://github.com/JimmyBoh/igneous/tree/master/spec/enum.spec.js) and [classes](https://github.com/JimmyBoh/igneous/tree/master/spec/class.spec.js)!

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