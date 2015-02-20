/**
 * Created by Jim on 2/16/2015.
 */

describe('The `Class` implementation', function () {

  var Class = (typeof window !== 'undefined') ? window.Class : require('../class.js');

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

  it('should run the `constructor` function during construction', function(){
    var InitTester = Class.extend({
      constructor: function () {
        this.constructorRan = true;
      }
    });

    var tester = new InitTester();
    
    expect(tester.constructorRan).toBe(true);
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
  
  it('should prevent access to private variables', function(){
    
    var privateId = '123';

    var TestClass = Class.extend({
      private: {
        id: privateId
      },
      constructor: function (name) {
        this.name = name;
      },
      getId: function () {
        return this.id;
      }
    });
    
    var me = new TestClass('Jim Buck');
    
    expect(me.id).toBeUndefined();
    expect(me.getId()).toBe(privateId);
  });
  
  it('should provide internal set access to private variables', function(){
    
    var TestClass = Class.extend({
      private: {
        id: 'id'
      },
      constructor: function (name) {
        this.name = name;
      },
      getId: function () {
        return this.id;
      },
      setId: function (id) {
        this.id = id;
      }
    });

    var me = new TestClass('Jim Buck');

    var directValue = 7;
    var methodValue = 10;

    me.setId(methodValue);
    me.id = directValue;

    expect(me.id).toBeUndefined();
    expect(me.getId()).toBe(methodValue);
  });
  
  it('should have a property to change the maximum number of stack traces when checking for private access', function(){
    var defaultVal = 10;
    var newerVal = 100;
    
    expect(Class.MAX_STACK_TRACE).toBe(defaultVal);
    
    Class.MAX_STACK_TRACE = newerVal;
        
    expect(Class.MAX_STACK_TRACE).toBe(newerVal);
  });
});