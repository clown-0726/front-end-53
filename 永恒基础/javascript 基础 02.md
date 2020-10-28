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
// 父类
function Car(color) {
  this.color = color;
}
Car.prototype.show = function() {
  console.log(this.color)
}

function BMW(color) {
  Car.call(this, color)
}
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