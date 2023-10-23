# recursion-executor

Run recursive functions without stack overflow. 

## executor(gf, initArgs)

- `gf` {Generator Function} - the recursive function to be run
- `initArgs` {Array} - arguments list for the recursive function

## Example

This package will use generator function to simulate the recursion process, so rewrite the recursion function a bit at the beginning.

```js
const executor = require('recursion-executor')

function* add(n) {
    if (n <= 1) return 1
    // use `yield` whenever calling itself recursively
    // as well as `const a = add(n - 1)`
    const a = yield [n - 1]
    return n + a
}
executor(add, [1e5])
```
