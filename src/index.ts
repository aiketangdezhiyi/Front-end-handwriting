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
