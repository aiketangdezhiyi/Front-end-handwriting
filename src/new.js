function _new(fn, ...arg) {
  const obj = Object.create(fn.prototype); // obj.__proto__ = fn.prototype
  const ret = fn.apply(obj, arg); // this = obj

  return ret instanceof Object ? ret : obj; // 如果有返回对象，就直接返回对象否则返回绑定为this的obj
}
