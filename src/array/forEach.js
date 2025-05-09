Array.prototype.myForEach = function (func, _this) {
  if (!Array.isArray(this)) {
    throw new TypeError(this + ' is not array');
  }
  const arr = this;
  let len = arr.length;
  _this = _this ? _this : globalThis;
  for (let i = 0; i < len; i++) {
    func.apply(_this, [arr[i], i, this]);
  }
};
