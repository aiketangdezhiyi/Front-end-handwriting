/**
 *
 * @param {Function} fn
 * @param  {...any} prevArgs 当前已经固定的参数
 * @returns
 */
function curry(fn, ...prevArgs) {
  return function (...args) {
    const params = prevArgs.concat(args);
    if (params.length >= fn.length) {
      return fn.apply(null, params); // 参数数量够了，执行函数
    } else {
      return curry(fn, ...params); // 参数不够，继续固定参数
    }
  };
}

// 兼容

/**
 *
 * @param {Function} fn
 * @returns
 */
function curry(fn) {
  const prevArgs = [].slice.call(arguments, 1);
  return function () {
    const params = prevArgs.concat([].slice.call(arguments, 0));
    if (params.length >= fn.length) {
      return fn.apply(null, params);
    } else {
      return curry.apply(fn, params);
    }
  };
}

// test code

function sum(a, b) {
  return a + b;
}

const sumBindA = curry(sum, 1);
console.log(sumBindA(2), sumBindA(3));
