/**
 * 状态模式
 * 原型模式
 * 桥接模式
 * 组合模式
 */

/**
 * 状态模式
 * 
 * 一个主体（Context）有很多状态（State）
 * 现在我们抽离这个主体中的状态单独管理
 * 比如红绿灯切换必然触发一些逻辑
 */

class State {
    constructor(color) {
        this.color = color
    }
    // 现在状态的切换交给这个类来管理
    switch (context) {
        console.log('State had been switched')
        context.setState(this)
    }
}

class Context {
    constructor() {
        this.state = null
    }
    getState() {
        console.log(this.state.color)
    }
    setState(state) {
        this.state = state
    }
}

let context = new Context()

let green = new State('green')
green.switch(context)
context.getState()

let red = new State('red')
red.switch(context)
context.getState()



/**
 * 原型模式
 * 
 * 当要创建新的对象的时候开销可能会比较大，就clone已有的对象
 * Object.create()方法其实现指导思想便是原型模式。
 */

/**
 * 桥接模式
 * 
 * 用于把抽象化和实现化解藕
 */

class ColorShape {
    yellowCicle() {
        console.log('yellowCicle')
    }
    greenCicle() {
        console.log('yellowCicle')
    }
    yellowTriangle() {
        console.log('yellowTriangle')
    }
    greenTriangle() {
        console.log('greenTriangle')
    }
}

let cs = new ColorShape()
cs.greenCicle()
cs.greenTriangle()
cs.yellowCicle()
cs.yellowTriangle

// We don't like above way to draw a picture so we appeal the "COLOR" as a seprate class

class Color {
    constructor(name) {
        this.name = name
    }
}

class Shape {
    constructor(shape, color) {
        this.shape = shape
        this.color = color
    }
    draw() {
        console.log(this.shape, this.color.name)
    }
}

let color = new Color('yellow')
let shape = new Shape('cicle', color)
shape.draw()

/**
 * 组合模式
 * 
 * 生成树形结构，表示“整体-部分”的关系
 * 让整体和部分都有一致的操作性
 * 
 * 虚拟DOM中的vnode是这种形式
 * 树形结构也是这种模式
 * 
 * 将整体和单个节点的操作抽象出来
 * 符合开闭原则
 */