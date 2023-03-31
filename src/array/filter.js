Array.prototype.myFilter = function (func, This) {
  if (!Array.isArray(this)) {
    throw new TypeError(this + " is not array");
  }
  const arr = [];
  let len = this.length;
  This = This ? This : globalThis;
  for (let i = 0; i < len; i++) {
    if (func.apply(This, [this[i], i, this])) {
      arr.push(this[i]);
    }
  }
  return arr;
};
