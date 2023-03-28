Function.prototype.myCall = function (_this, ...args) {
  const fn = this;
  if (typeof _this !== "object") {
    _this = new Object(_this);
  }
  Object.defineProperty(_this, "_fn", {
    enumerable: false,
    value: fn,
  });
  return _this._fn(...args);
};

// test code

function a(...args) {
  console.log(this);
  console.log(args);
}
a.myCall(1, 2);
a.call(1, 2);
