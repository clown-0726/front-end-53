/**
 * 工厂模式
 * 单例模式
 */

/**
 * 工厂模式
 * 
 * 将new操作单独封装
 */

class Factory {
    create(taste) {
        switch (taste) {
            case "Apple":
                iceCream = new AppleIceCream();
                break;

            case "Orange":
                iceCream = new OrangeIceCream();
                break;

            case "Banana":
                iceCream = new BananaIceCream();
                break;

            default:
                break;
        }
    }
}

class AppleIceCream {}
class OrangeIceCream {}
class BananaIceCream {}

let factory = new Factory()
factory.create(Orange)

/**
 * 单例模式
 * 
 * 一个类只有一个实例，单例模式强依赖于private，因此js中能实现，但是避免不了new 操作
 * 
 * 购物车必须是单例模式。
 * vuex和redux必须是单例原则
 * jquery也只有一个实例，体现了单例原则的思想
 */

class SingleObject {
    login() {
        console.log('login...');
    }
}


SingleObject.getInstance = (function () {
    let instance
    return function () {
        if (!instance) {
            instance = new SingleObject()
        }
        return instance
    }
})