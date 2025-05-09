Promise.resolve = function (data) {
  if (data instanceof Promise) {
    return data;
  }
  return new Promise((resolve) => {
    resolve(data);
  });
};

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
};

/**
 *
 * @param {Iterable} proms
 */
Promise.all = function (proms) {
  return new Promise((resolve, reject) => {
    try {
      const resolveData = [];
      let count = 0,
        resolvedCount = 0;

      for (const prom of proms) {
        let i = count;
        count++;
        Promise.resolve(prom).then((data) => {
          resolvedCount++;
          resolveData[i] = data;
          if (resolvedCount >= count) {
            resolve(resolveData);
          }
        }, reject);
      }
      if (count === 0) {
        resolve(resolveData);
      }
    } catch (err) {
      reject(err);
    }
  });
};

Promise.allSettled = function (proms) {
  return new Promise((resolve, reject) => {
    let count = 0,
      settledCount = 0,
      resolvedData = [];
    for (const prom of proms) {
      let i = count;
      count++;
      Promise.resolve(prom)
        .then(
          (data) => {
            settledCount++;
            resolvedData[i] = {
              state: 'fullfilled',
              data,
            };
          },
          (reason) => {
            settledCount++;
            resolvedData[i] = {
              state: 'rejected',
              reason,
            };
          }
        )
        .finally(() => {
          if (resolvedCount >= count) {
            resolve(resolvedData);
          }
        });
    }
  });
};

Promise.race = function (proms) {
  return new Promise((resolve, reject) => {
    for (const prom of proms) {
      Promise.resolve(prom).then(resolve, reject);
    }
  });
};

Promise.prototype.finally = function (onSettled) {
  // 该方法传入一个回调，该回调不接受任何参数，并且这个回调在promise的状态到达已决Settled阶段时必定执行，无论fulfilled或rejected,都会执行回调。这个方法还会返回一个Promise对象，并且这个Promise对象的状态和数据与之前的Promise的状态和数据一致。
  return this.then(
    (data) => {
      // then返回的也是一个Promise对象
      onSettled(); // 执行回调,但不传递数据
      return data; // 保证返回的Promise对象的数据一致
    },
    (reason) => {
      onSettled();
      throw reason; // 保证返回的Promise对象的数据状态一致
    }
  );
};
