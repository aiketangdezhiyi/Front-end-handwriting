export function flat(arr: any[]) {
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      prev.push(...flat(cur));
    } else {
      prev.push(cur);
    }
    return prev;
  }, []);
}

export function runMicrotask(fn) {
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
