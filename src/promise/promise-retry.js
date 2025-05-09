Promise.retry = function (fn, time, timeout) {
  let hasTryCount = 0;
  const retryPro = new Promise((resolve, reject) => {
    function run() {
      fn().then(resolve, (reason) => {
        hasTryCount++;
        if (hasTryCount >= time) {
          reject(reason);
          return;
        }
        run();
      });
    }
    run();
  });
  const timePro = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('timeout');
    }, timeout);
  });
  return Promise.race([retryPro, timePro]);
};
