Array.prototype.myReduce = function (func, initState) {
  if (!Array.isArray(this)) return;
  const arr = this;
  if (arr.length === 0) return initState;

  let i = 0;
  if (initState === undefined) {
    i = 1; // 没有给定值默认第一次的prev是数组的第一项
    initState = arr[0];
  }
  let prev = initState;
  for (; i < arr.length; i++) {
    prev = func(prev, arr[i], i, arr);
  }
  return prev;
};

// test code
const arr = [1, 2, 3];
const res = arr.reduce((prev, cur, i, _this) => {
  console.log("reduce", prev, cur, i, _this);
  return prev + cur;
});

const res1 = arr.myReduce((prev, cur, i, _this) => {
  console.log("myReduce", prev, cur, i, _this);
  return prev + cur;
});

console.log(res, res1);
