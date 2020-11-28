#### js 字符串转成数组

```javascript
var a = "abc";
Array.from(a)
[...new Set(a)]
```

#### 为什么函数类库为什么喜欢用 `call`

```javascript
function foo() {}
foo.call(this, {})
```

这么写的最主要原因就是 `this`，能灵活的绑定

#### js 继承

```javascript
/**
 * 一个类实例化的过程我们可以理解为：
 * 1. 调用父类的构造函数进行父类的实例化，再调用自己的构造函数进行实例化。（实例化的过程其实就是调用构造函数的过程）
 * 2. 共享父类的”方法“和”属性“
 * */ 

/**
 * js 继承要解决的问题:
 * 1. 构造函数的调用，因为js中函数既是类又是构造函数本身
 * 2. 实例指向的原型的构造方法应该是其本身（这是类行判断的标准）
 * 3. 要能分享父类的“方法”和“属性”
 * 总结一下：构造函数调用 / 原型链分享 / 类型判断
 * */

// 父类
function Car(color) {
  this.color = color;
}
Car.prototype.run = function () {
  console.log(this.color + " is running!");
};
// 子类
function BMW(color) {
  Car.call(this, color); // 调用父类的构造方法（解决“构造方法调用”问题）
}
/**
 * 首先克隆一个父类的原型，并让子类指向父类这个克隆的原型（解决“原型链分享”的问题）
 * 但是克隆出来的原型有个严重问题，就是这个原型的构造方法指向父类，影响了子类的类型判断
 * 我们知道，一个方法原型的构造方法就起其本身，因此将克隆出来的原型的构造方法指向其子类（解决“类型判断”的问题）
 * 
 * Object.create(Car.prototype) 在老版本中用的是 new Car() 这会导致父类的构造函数被调用两遍
 */
var _prototype = Object.create(Car.prototype);
_prototype.constructor = BMW;
BMW.prototype = _prototype;
// 测试
var s = new BMW("red");
s.run();
```

```js
// Object.create() 原理
function content(obj) {
  function F() {};
  F.prototype = obj;
  return new F();
}

var _prototype = Object.create(Car.prototype)
var _prototype = content(Car.prototype)
```





#### ES6 语法糖

```javascript
// 父类
class Car {
  constructor(color) {
    this.color = color;
  }
  show() {
    console.log(this.color)
  }
}

// 子类
class BMW extends Car {
  constructor(color) {
    super(color);
    super.uu = 'abc';            //*** 问题2
  }
  
  foo() {                        //***
    console.log(1);              //*** 问题1
  }                              //***
}

BMW.prototype.foo = function() { //***
  console.log(2);                //*** 问题1
}                                //***

// 执行
const bwm = new BMW('green');
bwm.show();

bwm.foo(); // 2                  // *** 结果1

const car = new Car('green');    // ***
console.log(car.uu); // undifined// *** 结果2
console.log(bwm.uu); // abc      // ***
```

- 问题一：`BMW` 其实就是函数，因为只有函数才有 `prototype`
- 问题二：`super` 在没有被call之前就是 `this`

#### 手写 `bind`

Xxx

#### 深拷贝

Xxx

#### 手写 ajax

xxx