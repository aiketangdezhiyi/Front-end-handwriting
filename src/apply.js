/**
 *
 * @param {any} _this
 * @param {any[]} args
 */
Function.prototype.myApply = function (_this, args) {
  const fn = this;
  const res = fn.call(_this, ...args);
  return res;
};

/**
 *
 * @param {any} _this
 * @param {any[]} args
 */
Function.prototype.myApply = function (_this, args) {
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

function a(a, b) {
  console.log(this);
  console.log(a, b);
}
a.apply({}, [1, 2]);
a.myApply({}, [1, 2]);
