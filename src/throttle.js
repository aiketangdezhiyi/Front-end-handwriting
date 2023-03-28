function throttle(fn, duration) {
  // 第一次一定执行
  let lastTime = 0;
  return function (...args) {
    let nowTime = Date.now();
    if (nowTime - lastTime >= duration) {
      fn.apply(this, args);
      lastTime = nowTime;
    }
  };
}

function throttle(fn, duration) {
  // 最后一次一定执行
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, duration);
    }
  };
}
