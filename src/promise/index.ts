enum PromiseStatus {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

type PromiseExecutor<T> = (
  resolve: (value: T) => void,
  reject: (reason: any) => void
) => void;

interface IPromiseObject {
  callback: Function;
  resolve: (value: any) => void;
  reject: (reason: any) => void;
  isExecute: boolean;
}

export class MyPromise<T> {
  private status = PromiseStatus.PENDING;
  private value?: T = undefined;
  private resolveCallbackList: IPromiseObject[] = [];
  private rejectCallbackList: IPromiseObject[] = [];

  static isPromise(obj) {
    return obj instanceof MyPromise || (obj && typeof obj.then === 'function');
  }

  static runMicroTask(fn: Function) {
    if (typeof globalThis.MutationObserver !== 'undefined') {
      const observer = new MutationObserver(fn as any);
      const textNode = document.createTextNode('1');
      observer.observe(textNode, {
        characterData: true,
      });
      textNode.data = '2';
      return;
    } else {
      setTimeout(() => {
        fn();
      }, 0);
    }
  }

  constructor(executor: PromiseExecutor<T>) {
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  private resolve(value: T) {
    if (this.status !== PromiseStatus.PENDING) {
      return;
    }
    this.status = PromiseStatus.FULFILLED;
    this.value = value;
    this.runTaskList();
  }

  private reject(reason: any) {
    if (this.status !== PromiseStatus.PENDING) {
      return;
    }
    this.status = PromiseStatus.REJECTED;
    this.value = reason;
    this.runTaskList();
  }

  private runTaskList() {
    let list: IPromiseObject[] = [];
    if (this.status === PromiseStatus.FULFILLED) {
      list = this.resolveCallbackList;
    } else if (this.status === PromiseStatus.REJECTED) {
      list = this.rejectCallbackList;
    }
    MyPromise.runMicroTask(() => {
      list.forEach((item) => {
        this.runTask(item);
      });
    });
  }

  private runTask(item: IPromiseObject) {
    const { callback, resolve, reject, isExecute } = item;
    try {
      if (isExecute) {
        return;
      }
      const result = callback(this.value);
      if (MyPromise.isPromise(result)) {
        result.then(resolve, reject);
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    } finally {
      item.isExecute = true;
    }
  }

  public then(
    onFullfilled?: (value: T) => any,
    onRejected?: (reason: any) => any
  ): MyPromise<any> {
    // 值穿透
    const onFullfilledFn =
      typeof onFullfilled === 'function' ? onFullfilled : (value: T) => value;
    const onRejectedFn =
      typeof onRejected === 'function'
        ? onRejected
        : (reason: any) => {
            throw reason;
          };

    return new MyPromise((resolve, reject) => {
      this.resolveCallbackList.push({
        callback: onFullfilledFn,
        resolve,
        reject,
        isExecute: false,
      });
      this.rejectCallbackList.push({
        callback: onRejectedFn,
        resolve,
        reject,
        isExecute: false,
      });
      this.runTaskList();
    });
  }

  public catch(onRejected?: (reason: any) => any) {
    return this.then(undefined, onRejected);
  }
}

const promise = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve('abc');
  }, 1000);
});

promise
  .then((res) => {
    console.log('a', res);
    return new MyPromise((resolve) => {
      resolve('def');
    });
  }, console.error)
  .then((res) => {
    console.log('d', res);
  }, console.error);

promise
  .then((res) => {
    console.log('b', res);
    return 'abc';
  }, console.error)
  .then((res) => {
    console.log('c', res);
  }, console.error);
