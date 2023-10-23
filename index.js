class FastQueue {
    constructor() {
        this.map = {}
        this.first = 0
        this.last = -1
    }
    push(...args) {
        let i = 0
        if (!this.length) {
            this.first = this.last = 0
            this.map[this.first] = args[i++]
        }
        for (; i < args.length; i++) {
            this.map[++this.last] = args[i]
        }
    }
    unshift(...args) {
        let i = 0
        if (!this.length) {
            this.first = this.last = 0
            this.map[this.first] = args[i++]
        }
        for (; i < args.length; i++) {
            this.map[--this.first] = args[i]
        }
    }
    pop() {
        const r = this.map[this.last]
        delete this.map[this.last]
        this.last--
        return r
    }
    shift() {
        const r = this.map[this.first]
        delete this.map[this.first]
        this.first++
        return r
    }
    get length() {
        if (this.first > this.last) return 0
        return this.last - this.first + 1
    }
    get(x) {
        return this.map[this.first + x]
    }
    getLast() {
        return this.map[this.last]
    }
    forEach(fn) {
        for (let i = this.first; i <= this.last; i++) {
            const r = fn(this.map[i], i - this.first)
            if (r === false) break
        }
    }
}

function executor(gf, initArgs) {
    const stk = new FastQueue()
    stk.push([initArgs])
    while (stk.length) {
        let [args, g] = stk.pop()
        let obj
        if (g) {
            // continue previous call
            obj = g.next(args)
        } else {
            // new call
            g = gf(...args)
            obj = g.next()
        }
        //
        if (obj.done) {
            if (stk.length) {
                stk.getLast()[0] = obj.value
            } else {
                return obj.value
            }
        } else {
            stk.push([null, g])
            stk.push([obj.value, null])
        }
    }
}

module.exports = executor
