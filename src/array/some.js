Array.prototype.mySome = function (func, This) {
  if (!Array.isArray(this)) {
    throw new TypeError(this + ' is not array');
  }
  const arr = this;
  if (arr.length === 0) {
    return false;
  }
  let len = this.length;
  This = This ? This : globalThis;
  for (let i = 0; i < len; i++) {
    if (func.apply(This, [arr[i], i, arr])) {
      return true;
    }
  }
  return false;
};

// test code

const array = [1, 2, 3, 4, 5];

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.mySome(even));
// Expected output: true
