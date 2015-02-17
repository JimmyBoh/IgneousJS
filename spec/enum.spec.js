/**
 * Created by Jim Buck on 2/16/2015.
 */

describe('The `Enum` implementation', function () {
  
  var Enum;
  
  if(typeof window !== 'undefined'){
    Enum = window.Enum;
  } else{
    Enum = require('../tmp/igneous.min.js').Enum;
  }
  
  it('should provide a method to extend the `Enum` type', function(){
    
    var Switch = Enum.extend('On', 'Off');
    
    expect(Switch instanceof Enum).toBe(true);
  });
  
  it('should not allow Enums to extend other Enums', function(){
    var Switch = Enum.extend('On', 'Off');
    var Dimmer;
    
    function tryExtendEnum(){
      Dimmer = Switch.extend('On', 'Kinda Bright', 'Kinda Dim', 'Off');
    }
    
    expect(tryExtendEnum).toThrow();
  })
  
  it('should accept multiple strings as parameters', function(){
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
  
  it('should accept an array of strings as parameters', function(){
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
  
  it('should accept an object map as parameters', function(){
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
    
    for(var dir in enumValues){
      expect(Direction[dir]).toBe(enumValues[dir]);
    }
  });

  it('should integer values to string values', function () {

    var enumValues = {
      'North': 0,
      'South': 1,
      'East': 2,
      'West': 4
    };
    
    var Direction = Enum.extend(enumValues);

    for(var str in enumValues){
      expect(Direction[enumValues[str]]).toBe(str);
    }
  });
  
  it('should provide a `toString` method to access string values', function() {
    var enumValues = [
      'North',
      'South',
      'East',
      'West'
    ];

    var Direction = Enum.extend(enumValues);

    for (var i in enumValues) {
      var dir = enumValues[i];
      expect(Direction.toString(i)).toBe(dir);
    }
  });
  
  it('should provide an `Enum.hasFlag` method for easy bitwise checks', function(){
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