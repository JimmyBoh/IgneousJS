/**
 * Created by Jim Buck on 2/16/2015.
 */

describe('The `Enum` implementation', function () {

  var Enum = (typeof window !== 'undefined') ? window.Enum : require('../enum.js');

  it('should provide a method to extend the `Enum` type', function () {

    var Switch = Enum.extend('On', 'Off');

    expect(Switch instanceof Enum).toBe(true);
  });

  it('should not allow Enums to extend other Enums', function () {
    var Switch = Enum.extend('On', 'Off');
    var Dimmer;

    function tryExtendEnum() {
      Dimmer = Switch.extend('On', 'Kinda Bright', 'Kinda Dim', 'Off');
    }

    expect(tryExtendEnum).toThrow();
  });

  it('should accept multiple strings as parameters', function () {
    var enumValues = [
      'North',
      'South',
      'East',
      'West'
    ];

    var Direction = Enum.extend(enumValues[0], enumValues[1], enumValues[2], enumValues[3]);

    for (var i in enumValues) {
      var dir = enumValues[i];
      expect(Direction[dir]).toBeDefined();
    }
  });

  it('should accept an array of strings as parameters', function () {
    var enumValues = [
      'North',
      'South',
      'East',
      'West'
    ];

    var Direction = Enum.extend(enumValues);

    for (var i in enumValues) {
      var dir = enumValues[i];
      expect(Direction[dir]).toBeDefined();
    }
  });

  it('should accept a simple object map as parameters', function () {
    var enumValues = {
      'North': 0,
      'South': 1,
      'East': 2,
      'West': 4
    };

    var Direction = Enum.extend(enumValues);

    for (var dir in enumValues) {
      expect(Direction[dir]).toBe(enumValues[dir]);
    }
  });

  it('should allow iterating the enum values', function () {

    var enumValues = {
      'North' : 1,
      'South' : 2,
      'East'  : 4,
      'West'  : 8
    };

    var Direction = Enum.extend(enumValues);

    for (var dir in Direction) {
      expect(!isNaN(dir)).toBe(true);
    }
  });

  it('should accept an object map with any order as parameters', function () {
    var enumValues = {
      'North': 1,
      2: 'South',
      'East': 4,
      8: 'West'
    };

    var Direction = Enum.extend(enumValues);

    for (var dir in Direction) {
      expect(isNaN(dir)).toBe(false);
      expect(isNaN(Direction[dir])).toBe(true);
    }
  });

  it('should be an instance of `Enum` type', function () {
    var enumValues = [
      'North',
      'South',
      'East',
      'West'
    ];

    var Direction = Enum.extend(enumValues);

    expect(Direction instanceof Enum).toBe(true);
  });

  it('should treat entries as integers', function () {

    var enumValues = {
      'North': 0,
      'South': 1,
      'East': 2,
      'West': 4
    };

    var Direction = Enum.extend(enumValues);

    for (var dir in enumValues) {
      expect(Direction[dir]).toBe(enumValues[dir]);
    }
  });

  it('should not allow the enum values to change', function () {

    var enumValues = {
      'On': 1,
      'Off': -1
    };
    
    var newValue = 10;

    var Switch = Enum.extend(enumValues);

    Switch.On = newValue;

    expect(Switch.On).toBe(enumValues.On);
  });

  it('should integer values to string values', function () {

    var enumValues = {
      'North': 0,
      'South': 1,
      'East': 2,
      'West': 4
    };

    var Direction = Enum.extend(enumValues);

    for (var str in enumValues) {
      expect(Direction[enumValues[str]]).toBe(str);
    }
  });

  it('should provide an `Enum.hasFlag` method for easy bitwise checks', function () {
    var enumValues = [
      'North',
      'South',
      'East',
      'West'
    ];

    var Direction = Enum.extend(enumValues);

    var myHeading = Direction.North | Direction.East;

    expect(Enum.hasFlag(myHeading, Direction.North)).toBe(true);
    expect(Enum.hasFlag(myHeading, Direction.East)).toBe(true);
    expect(Enum.hasFlag(myHeading, Direction.South)).toBe(false);
    expect(Enum.hasFlag(myHeading, Direction.West)).toBe(false);
  });

});