/**
 *
 * @param {any[]} arr
 */
function flat(arr) {
  // JSON序列化有问题 请参考深度克隆 https://blog.csdn.net/Ares0412/article/details/127386317
  const res = JSON.stringify(arr).replace(/[\[\]]/g, '');
  return JSON.parse('[' + res + ']');
}

/**
 *
 * @param {any[]} arr
 */
function flat1(arr) {
  return arr.reduce((prev, cur) => {
    Array.isArray(cur) ? prev.push(...flat2(cur)) : prev.push(cur);
    return prev;
  }, []);
}

/**
 * 箭头函数版 写法简洁与flat1一样
 * @param {any[]} arr
 * @returns
 */
const flat2 = (arr) =>
  arr.reduce((prev, cur) => {
    Array.isArray(cur) ? prev.push(...flat2(cur)) : prev.push(cur);
    return prev;
  }, []);

const res = flat([[[1, 2, 3], 1, 2, 3, 5, 9, [27]]]);
console.log(res);

const res1 = flat1([[[1, 2, 3], 1, 2, 3, 5, 9, [27]]]);
console.log(res1);

const res2 = flat2([[[1, 2, 3], 1, 2, 3, 5, 9, [27]]]);
console.log(res2);
