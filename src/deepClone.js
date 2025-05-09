/**
 * 解决深度克隆带来的循环引用的问题
 * @param {any} val
 * @param {WeakMap<any,any>} visited
 * @returns
 */
function deepClone(val, visited = new WeakMap()) {
  if (typeof val !== 'object') return val;
  if (visited.has(val)) return visited.get(val);

  const res = Array.isArray(val) ? [] : {};
  visited.set(val, res);

  for (const prop in val) {
    if (Object.hasOwnProperty.call(val, prop)) {
      res[prop] = deepClone(val[prop], visited);
    }
  }

  return res;
}

// test code

const a = {};
const b = [a];
a.b = b;
const obj = {
  a,
  b,
};
console.log(deepClone(obj));
