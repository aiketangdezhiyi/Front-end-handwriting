Array.prototype.myEvery = function (func, This) {
  if (!Array.isArray(this)) {
    throw new TypeError(this + " is not array");
  }
  const arr = this;
  let len = this.length;
  This = This ? This : globalThis;
  for (let i = 0; i < len; i++) {
    if (!func.apply(This, [arr[i], i, arr])) {
      return false;
    }
  }
  return true;
};

// test code

const isBelowThreshold = (currentValue) => currentValue <= 100;

const array1 = [1, 30, 39, 29, 10, 13, 100];

console.log(array1.myEvery(isBelowThreshold));
// Expected output: true
