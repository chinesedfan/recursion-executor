module.exports = function executor(gf, initArgs) {
    const stk = []
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
                stk[stk.length - 1][0] = obj.value
            } else {
                return obj.value
            }
        } else {
            stk.push([null, g])
            stk.push([obj.value, null])
        }
    }
}
