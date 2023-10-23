const executor = require('../index')

function* add(n) {
    if (n <= 1) return 1
    const a = yield [n - 1]
    return n + a
}
function* dfs(arr, adj, u, p) {
    let sum = arr[u]
    const nb = adj[u] || []
    for (let i = 0; i < nb.length; i++) {
        const v = nb[i]
        if (v === p) continue
        // as well as `sum += dfs(adj, v, u)`
        sum += yield [arr, adj, v, u]
    }
    return sum
}

describe('Examples', () => {
    it('sum', () => {
        const n = 1e5
        expect(executor(add, [n])).toEqual(n * (n + 1) / 2)
    })
    it('dfs', () => {
        const n = 1e6
        const arr = Array(n + 1)
        const adj = {}
        for (let i = 1; i <= n; i++) {
            arr[i] = i
            // binary complete tree
            const u = i
            const v = Math.floor(i / 2)
            adj[u] = adj[u] || []
            adj[v] = adj[v] || []
            adj[u].push(v)
            adj[v].push(u)
        }
        expect(executor(dfs, [arr, adj, 1, 0])).toEqual(n * (n + 1) / 2)
    })
})
