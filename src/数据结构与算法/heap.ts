// 最小堆

export class Heap<T> {
  private heap: T[] = [];
  private compare: (a: T, b: T) => number;

  constructor(arr: T[] = [], compare: (a: T, b: T) => number) {
    this.compare = compare;

    for (let i = 0; i < arr.length; i++) {
      this.push(arr[i]);
    }
  }

  public get size(): number {
    return this.heap.length;
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number {
    return index * 2 + 1;
  }

  private getRightChildIndex(index: number): number {
    return index * 2 + 2;
  }

  private swap(index1: number, index2: number): void {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  private siftUp(index: number) {
    let parentIndex = this.getParentIndex(index);
    while (parentIndex >= 0 && this.compare(this.heap[index], this.heap[parentIndex]) < 0) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = this.getParentIndex(index);
    }
  }

  public push(value: T) {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
  }

  public peek(): T | undefined {
    return this.heap[0];
  }

  public pop(): T | undefined {
    if (this.size === 0) {
      return undefined;
    }
    if (this.size === 1) {
      return this.heap.pop();
    }
    this.swap(0, this.size - 1);
    const min = this.heap.pop();
    this.siftDown(0);
    return min;
  }

  private siftDown(index: number) {
    let leftIndex = this.getLeftChildIndex(index) < this.size ? this.getLeftChildIndex(index) : -1;
    let rightIndex = this.getRightChildIndex(index) < this.size ? this.getRightChildIndex(index) : -1;

    while (leftIndex > -1 || rightIndex > -1) {
      let curIndex = index;
      if (leftIndex > -1 && this.compare(this.heap[leftIndex], this.heap[index]) < 0) {
        this.swap(leftIndex, index);
        index = leftIndex;
      } else if (rightIndex > -1 && this.compare(this.heap[rightIndex], this.heap[index]) < 0) {
        this.swap(rightIndex, index);
        index = rightIndex;
      }
      if (curIndex === index) {
        break;
      }
      leftIndex = this.getLeftChildIndex(index) < this.size ? this.getLeftChildIndex(index) : -1;
      rightIndex = this.getRightChildIndex(index) < this.size ? this.getRightChildIndex(index) : -1;
    }
  }

  public toString() {
    return this.heap.toString();
  }
}

const heap = new Heap([99, 1, 2, 3, 4, 5, 6, 7, 8, 9], (a, b) => a - b);

console.log(heap.toString());

heap.pop();

console.log(heap.toString());
