/**
 * Created by Jim on 2/16/2015.
 */

describe('Class Tests', function () {

  var Class = require('../dist/igneous.js').Class;

  it('should allow extending from the `Class` type', function () {
    expect(typeof Class.extend).toBe('function');
  });

  it('should return a constructor function when extending', function () {
    var Person = Class.extend({});

    expect(typeof Person).toBe('function');
  });

  it('should allow inheritance to the grandchildren or deeper level', function () {
    var Parent = Class.extend({});
    var Child = Parent.extend({});
    var Grandchild = Child.extend({});
    
    var grandchild = new Grandchild();
    
    expect(grandchild instanceof Parent).toBe(true);
    expect(grandchild instanceof Child).toBe(true);
    expect(grandchild instanceof Grandchild).toBe(true);
    
  });

  it('should run the `init` function as the constructor.', function(){
    var InitTester = Class.extend({
      constructor: function () {
        this.initRan = true;
      }
    });

    var tester = new InitTester();
    
    expect(tester.initRan).toBe(true);
  });

  it('should give the ability to run parent methods through the `this.super` call', function(){
    var Parent = Class.extend({
      constructor: function () {
        this.calls = 0;
      },
      act: function () {
        this.calls++;
      }
    });

    var Child = Parent.extend({
      constructor: function () {
        this.super();
      },
      act: function () {
        this.super();
        this.calls++;
      }
    });

    var Grandchild = Child.extend({
      constructor: function () {
        this.super();
      },
      act: function () {
        this.super();
        this.calls++;
      }
    });

    var grandchild = new Grandchild();

    grandchild.act();
    
    expect(grandchild.calls).toBe(3);
  });
});