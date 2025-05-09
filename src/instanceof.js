/**
 *
 * @param {Object} obj
 * @param {Function} Constructor
 * @returns
 */
function _instanceof(obj, Constructor) {
  const prototype = Constructor.prototype;
  while (obj) {
    if (obj === prototype) {
      return true;
    }
    obj = Object.getPrototypeOf(obj);
  }
  return false;
}

// test code

function A() {}
const a = new A();
console.log(_instanceof(a, A));
console.log(_instanceof([], Array));
console.log(_instanceof([], Object));
