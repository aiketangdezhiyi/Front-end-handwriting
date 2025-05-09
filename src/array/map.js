Array.prototype.myMap = function (func, This) {
  if (!Array.isArray(this)) {
    throw new TypeError(this + ' is not array');
  }
  const res = [];
  let len = this.length;
  This = This ? This : globalThis;
  for (let i = 0; i < len; i++) {
    res.push(func.apply(This, [this[i], i, this]));
  }
  return res;
};

// test code

const res = [1, 2, 3].myMap((it, i) => ({
  value: it,
  idx: i,
}));
console.log(res);
