function jsonp(url, success) {
  // 请求地址 回调的函数名 成功的回调
  const script = document.createElement('script');
  const functionName = 'cb' + Math.random().toString().substring(2); // 生成一个函数名
  window[functionName] = success; // 全局导入函数 等待执行
  let src = url;

  if (src.includes('?')) {
    src += `&callback=${functionName}`;
  } else {
    src += `?callback=${functionName}`;
  }
  script.src = src;
  document.head.appendChild(script); // 添加元素 发送请求
  setTimeout(() => {
    script.remove(); // script依然会继续执行
  }, 0);
}
