/**
 * 适配器模式
 * 装饰器模式
 * 代理模式
 */

/**
 * 适配器模式
 * 
 */

class Target {
    specificRequest() {
        return 'Genrman socket'
    }
}

class Adaptee {
    constructor() {
        this.target = new Target()
    }
    request() {
        let info = this.target.specificRequest()
        return info
    }
}

let target = new Adaptee()
let info = target.request()
console.log(info)


/**
 * 装饰器模式
 * 
 */

class Circle {
    draw() {
        console.log('Draw a cicle')
    }
}

class Decorator {
    constructor(circle) {
        this.circle = circle
    }
    draw() {
        this.setRedBoarder(this.circle)
        this.circle.draw()
    }
    setRedBoarder(circle) {
        console.log('Set the border in red')
    }
}

// Test the class without decorator
let circle = new Circle()
circle.draw()

// Test the class with decorate
let decCircle = new Decorator()
decCircle.draw()

// -----------------------------------------------------------------------

function mixins(...list) {
    return function (target) {
        Object.assign(target.prototype, ...list)
    }
}

const Foo = {
    foo() {
        alert('foo')
    }
}

@mixins(Foo)
class MyClass {

}

let obj = new MyClass()
obj.foo()

// -----------------------------------------------------------------------

function log(target, name, descriptor) {
    let oldValue = descriptor.value
    descriptor.value = function () {
        console.log(`calling ${name} with`, arguments)
        return oldValue.apply(this, arguments)
    }
    return descriptor
}

class Math {
    @log
    add(a, b) {
        return a + b
    }
}

let math = new Math()
const result = math.add(2, 4)
console.log(result)

// -----------------------------------------------------------------------

function readonly(target, name, descriptor) {
    descriptor.writable = false
    return descriptor
}

class Person {
    constructor() {
        this.first = 'A'
        this.last = 'B'
    }

    @readonly
    name() {
        return `${this.first} ${this.last}`
    }
}

let p = new Person()
console.log(p.name())


/**
 * 代理模式
 * 
 */

class Star {
    constructor() {}
    showConjuring() {
        console.log('Star show conjuring')
    }
}

class Broker {
    constructor() {
        this.star = new Star()
    }
    showConjuring() {
        this.star.showConjuring()
    }
}

let star = new Broker()
star.showConjuring()

/**
 * 在没有接口的情况下，代理模式和适配器模式的代码基本一样，但是其中是有本质区别的
 * 适配器模式是客户可以用目标功能，但是比如由于功能比较老旧没法直接使用，因此用适配器转换一下，适配器的方法和目标中的方法名不应该是一样的
 * 代理模式是比如客户访问目标，但是没有权限，必须经过一层代理，代理决定你是否有权限访问哪些特定内容，代理方法名和目标方法名应该是一样的
 * 
 * 因此，在传统的uml图中，
 * 适配器中适配器和目标是实现不同的接口
 * 代理中代理和目标必须是实现同一个接口
 * 
 */