function isPromise(obj) {
  return typeof obj === 'object' && typeof obj.then === 'function';
}

class MyPromise {
  static PENDING = 'pending';
  static RESOLVE = 'fullfilled';
  static REJECT = 'rejected';

  _runTaskQueue = [];

  constructor(exec) {
    this._state = MyPromise.PENDING;
    this._data = null;
    this._queue = [];
    try {
      exec(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }

  _changeState(state, data) {
    if (this._state !== MyPromise.PENDING) {
      return;
    }
    this._state = state;
    this._data = data;
    this._run();
  }

  _resolve(data) {
    this._changeState(MyPromise.RESOLVE, data);
  }
  _reject(reason) {
    this._changeState(MyPromise.REJECT, reason);
  }
  /**
   * 执行回调
   */
  _run() {
    if (this._state === MyPromise.PENDING) {
      return;
    }
    for (let i = 0; i < this._queue.length; i++) {
      if (this._queue[i].state === this._state) {
        this._runTaskQueue.push(this._queue[i]);
      }
    }
    this._nextTickTask();
    this._queue = [];
  }

  _nextTickTask() {
    let timerFunc = null;
    const run = () => {
      for (let i = 0; i < this._runTaskQueue.length; i++) {
        const task = this._runTaskQueue[i];
        try {
          const res = task.cb(this._data);
          if (res instanceof MyPromise) {
            res.then(task.resolve, task.reject);
          } else {
            task.resolve(res);
          }
        } catch (error) {
          task.reject(error);
        }
      }
      this._runTaskQueue = [];
    };

    if (typeof MutationObserver !== 'undefined') {
      let counter = 1;
      const observer = new MutationObserver(run);
      const textNode = document.createTextNode(String(counter));
      observer.observe(textNode, {
        characterData: true,
      });
      timerFunc = () => {
        counter = (counter + 1) % 2;
        textNode.data = String(counter);
      };
    } else {
      timerFunc = () => {
        setTimeout(run, 0);
      };
    }
    typeof timerFunc === 'function' && timerFunc();
  }

  then(onResolved, onRejected) {
    return new MyPromise((resolve, reject) => {
      typeof onResolved === 'function' &&
        this._queue.push({
          resolve,
          reject,
          state: MyPromise.RESOLVE,
          cb: onResolved,
        });
      typeof onRejected === 'function' &&
        this._queue.push({
          resolve,
          reject,
          state: MyPromise.REJECT,
          cb: onRejected,
        });
      this._run();
    });
  }
}

// test code
console.log(1);
setTimeout(() => {
  console.log(3);
});
const pro = new MyPromise((resolve, reject) => {
  resolve(99);
  console.log(2);
});

pro.then((data) => {
  console.log(data);
});
pro.then(() => {
  console.log('promise');
});

console.log('script end');

// 1
// 2
// script end
// 3
// 99
// promise

// 浏览器环境支持MutationObserver
// 1
// 2
// script end
// 99
// promise
// 3
