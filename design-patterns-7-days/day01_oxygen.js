class Observer {
    constructor(subject) {
        this.value = null
        this.subject = subject
    }
    update() {
        console.log(this.subject.getState())
    }
}

class Subject {
    constructor() {
        this.state = null
        this.observers = new Array()
    }

    getState() {
        return this.state
    }

    setState(state) {
        this.state = state
    }

    attach(observer) {
        this.observers.push(observer)
    }

    notifyAllObservers() {
        this.observers.forEach(observer => {
            observer.update()
        })
    }
}

let subject = new Subject()
let observer1 = new Observer(subject)
let observer2 = new Observer(subject)

subject.attach(observer1)
subject.attach(observer2)

subject.setState(4)
subject.notifyAllObservers()