/**
 * 享元模式
 * 策略模式
 * 模板模式
 * 责任链模式
 */

/**
 * 享元模式
 * 
 * 共享内存（主要考虑内存而非效率）
 * 相同的数据，共享使用
 */

/**
 * 策略模式
 * 
 * 业务中使用较多，真对业务场景
 * 不同的策略分开处理
 * 避免出现大量的 if...else
 */

/**
 * 模板模式
 * 
 * 在一个处理过程中有很多最终效果一样的处理方法，可以选择处理方法
 */

class Action {
    handle() {
        handle1()
        // handle2()
        // handle3()
    }
    handle1() {
        console.log('The effect will be stay the same amongst the 3 methods~')
    }
    handle2() {
        console.log('The effect will be stay the same amongst the 3 methods~')
    }
    handle3() {
        console.log('The effect will be stay the same amongst the 3 methods~')
    }
}

let action = new Action()
action.handle()

/**
 * 责任链模式
 * 
 * 1. Each actor should own the namely same method.
 * 2. Each actor should have ability to set it's downsteram actor.
 */

class ResponseabilityAction {
    constructor(name) {
        this.name = name
        this.nextAction = null
    }
    setNextAction(action) {
        this.nextAction = action
    }
    handle() {
        console.log(`$(this.name) will audit`)
        if (this.nextAction != null) {
            this.nextAction.handle()
        }
    }
}

let leader = new ResponseabilityAction('Leader')
let manager = new ResponseabilityAction('Manager')
let boss = new ResponseabilityAction('Boss')

leader.setNextAction(manager)
manager.setNextAction(boss)
leader.handle()