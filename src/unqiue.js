const unique1 = (arr) => arr.filter((cur, i) => arr.indexOf(cur) === i);

const unique2 = (arr) => new Array(...new Set(arr));

const unique3 = (arr) => {
  // 利用对象或Map去重
  const obj = {};
  const result = [];
  arr.forEach((ele) => {
    if (!obj[ele]) {
      obj[ele] = true;
      result.push(ele);
    }
  });
  return result;
};

const unique4 = (arr) => {
  // 利用对象或Map去重
  const map = new Map();
  const result = [];
  arr.forEach((ele) => {
    if (!map.get(ele)) {
      map.set(ele, true);
      result.push(ele);
    }
  });
  return result;
};

const unique5 = (arr) => {
  // 利用indexOf或includes
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (!result.includes(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
};

function includes(arr, start, end, val) {
  // 查看元素是否在这一段出现
  for (let i = start; i < end; i++) {
    if (arr[i] === val) {
      return true;
    }
  }
  return false;
}

const unique6 = (arr) => {
  // 如果是要对数组进行原地去重的话可以用splice
  for (let i = 0; i < arr.length; i++) {
    if (includes(arr, 0, i, arr[i])) {
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
};

// test code

console.log(unique1([1, 2, 6, 5, 95, 95, 6, 9]));
console.log(unique2([1, 2, 6, 5, 95, 95, 6, 9]));
console.log(unique3([1, 2, 6, 5, 95, 95, 6, 9]));
console.log(unique4([1, 2, 6, 5, 95, 95, 6, 9]));
console.log(unique5([1, 2, 6, 5, 95, 95, 6, 9]));
console.log(unique6([1, 2, 6, 5, 95, 95, 6, 9]));
