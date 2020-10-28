#### >>> 第一题

```javascript
if(false){
    a = 3
}
console.log(a)
```

考点：

1. 变量提升

#### >>> 第二题

```js
alert(a);
a();
var a = 3;
function a(){
  alert(10);
}
alert(a);
a=6;
a();
```

考点：

1. 变量提升
2. 函数的声明优先于变量
3. 但是变量只声明没赋值的时候，则值仍为函数的值

#### >>> 第三题

```js
var a = function foo(num) {
  foo = num;
  console.log(typeof foo)
}
a(1)
```

考点：

1. 结果是function
2. 这是函数表达式，这里foo是只读的。如果是函数声明，就可以覆盖成为 `number` 类型了
3. `console.log(foo)` 会得到 `foo is not defined`

#### >>> 第四题

```js
var a = function foo(num) {
  foo = num;
  console.log(typeof foo);
  return 1;
}
a(1)
console.log(typeof foo())
```

考点：

1. 结果是报错
2. 函数表达式的 foo 只能在函数**内部**使用

#### >>> 第五题 ？？？

```js
this.a = 20;
var test = {
  a: 40,
  init: ()=> {
    console.log(this.a);
    function go() {
      // this.a = 60;
      console.log(this.a);
    }
    go.prototype.a = 50;
    return go;
  }
}
// var p = test.init();
// p();
new(test.init())();
```

考点：

1. xxx

#### >>> 第六题

```js
this.a = 20;
var test = {
  a: 40,
  init: function() {
    console.log(this.a)
  }
}; // 这个分号及其重要，没有这个分号就报错，会将下面的自执行函数和上面的连起来
(function(){
  var fn = test.init;
  fn();
})()
```

考点：

1. 分号也是很重要的
2. this 只和函数的调用点有关，谁调的函数，this就是谁的作用域（没写就是window对象调的）

#### >>> 第七题

```js
this.a = 20;
var test = {
  a: 40,
  init: ()=> {
    console.log(this.a)
  }
};
test.init();
```

考点：

1. 结果是20
2. 箭头函数绑定其父级作用域，也就是执行点，函数在哪里执行的，this就指向哪里

#### >>> 第八题

```js
this.test = 11;
var s = {
  a:function(){
    console.log(1 + this.test)
  },
  b(){ // 简单函数
    console.log(test)
  },
  c: ()=>{} // es6的简写函数体
};

var f = s.a.bind(this);
new f();

var p = s.b.bind(this);
new p();
```

考点：

1. es6中的 `b()...`这种声明方式不支持new，也就是这种函数不是构造函数
2. 结果是: NaN 报错
3. `var f = s.a.bind(this);`  中的bind只是一个疑惑点。new f() 代表里面的this已经是构造函数的实例了（指的新new的对象了）。

```js
function s() {
  this.a = 1;
}
var q = new s();
q.a
```

#### 总结：

1. 函数提升 变量提升 函数提升优先于变量提升
2. 当函数名和变量名相同时，如果变量没有被复制，则函数生效，否则变量生效
3. `var s = function g(){}` g 是只读的，g只能在函数内部访问
4. this谁调用指向谁，没人调用指向window对象
5. this当函数创建的时候，this指向当前函数的实例
6. **简单函数**不能被new，es6简写的函数体不能被new
7. **对象**和**闭包**不能在一起，之间必须有分号

```js
function C1(name){
  if(name) this.name = name;
}

function C2(name){
  this.name = name;
}

function C3(name){
  this.name = name || 'fe';
}

C1.prototype.name = 'yideng';
C2.prototype.name = '123';
C3.prototype.name = 'abc';
console.log((new C1().name) + (new C2().name) + (new C3().name))
```

考点：

1. 第一个name直接没赋值，所以直接去找原型链上的值
2. 第二个赋值了，不过是undefined，因此不去找原型链了
3. 第二个和明显就是fe了

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>

<script type="text/javascript">
  var list_li = document.getElementsByTagName('li');
  for(var i=0; i<list_li.length; i++){
    list_li[i].onclick = function() {
      console.log(i);
    }
  }
</script>
```

问：有几种方式能得到正确的输出？

考点：

1. 用闭包
2. 用 let 而不是 var
3. 将 console.log(i) 改为 console.log(this.i)

```js
var s = {a:1};
var q = s;
q.x = 2;
console.log(s);
```

考点：

1. s 最终会变，因为是按引用传递

```js
function test(m) {
  m = {v: 5}
}

var m = {k: 30}

test(m);
console.log('>>> '+ m.v)
```

考点：

1. 如果 `test(m)` 的值为 'undifined'
2. 如果 `test(a)` 的值为 '5'
3. 函数的参数是按值传递的



```js
function yideng() {
  console.log(1);
}

(function(){
  if(false) {
    function yideng() {
      console.log(2);
    }
  }
  yideng();
})();
```

考点：

1. 在不同浏览器结果不一样，有三种结果
2. 老浏览器，函数提升，值是2
3. 一个特定的火狐浏览器，undifined
4. 现代浏览器，`Uncaught TypeError: yideng is not a function`
5. `[,,].length` 有2 有3

```js
function yideng() {
  console.log(1);
}
if(false) {
  function yideng() {
    console.log(2);
  }
}
yideng();
```

考点：

1. 函数作用域提升，结果为1
2. 一般的函数提升都是先声明出一个值，然后这个值等于function。

#### 再来一个this指向问题

```js
function fn() {
  console.log(this.length);
}

var yideng = {
  length: 5,
  method: function(fn) {
    fn();  // 考点一 0
    arguments[0](); // 考点二 2
  }
}

yideng.method(fn, 1);
```

- `fn` 执行了，但是没人调 `fn` ，因此 `this.length` 指的是页面 `iframe` 的个数
- 这里 `this.length` = `window.length`
- 考点二中 `this` 指向的是 `arguments`

#### 原型链

```js
function Foo() {}
Foo.prototype.a = 'abc';

console.log(Foo.a); // undefined
var foo = new Foo();
console.log(foo.a); // abc
```

- 不 new 是不会去找的，只有 new 了才去原型链上去找
- `foo.__proto__ === Foo.prototype`