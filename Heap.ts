namespace Heap {
	/**
	 * @description Manages a collection of items that are ordered according to a priority
	 * queue, allowing for efficient insertion, extraction, and manipulation of elements.
	 */
	class Heap {
		protected items: number[] = [];

		protected getLIndex = (index: number) => 2 * index + 1;
		protected getRIndex = (index: number) => 2 * index + 2;
		protected getParentIndex = (index: number) =>
			Math.floor((index - 1) / 2);
		protected hasL = (index: number) =>
			this.getLIndex(index) < this.items.length;
		protected hasR = (index: number) =>
			this.getRIndex(index) < this.items.length;
		protected hasParent = (index: number) =>
			this.getParentIndex(index) >= 0;
		protected getL = (index: number) => this.items[this.getLIndex(index)];
		protected getR = (index: number) => this.items[this.getRIndex(index)];
		protected getParent = (index: number) =>
			this.items[this.getParentIndex(index)];
		/**
		 * @description Performs a value exchange between two elements in the heap, rearranging
		 * their positions in the array to maintain the heap property.
		 * 
		 * @param {number} a - Used to represent an index of a item in the `items` array that
		 * needs to be swapped with another item.
		 * 
		 * @param {number} b - Used to represent the second item to be swapped with the first
		 * item passed as `a`.
		 */
		protected swap = (a: number, b: number) => {
			[this.items[a], this.items[b]] = [this.items[b], this.items[a]];
		};

		protected heapifyUp!: () => void;
		protected heapifyDown!: () => void;

		/**
		 * @description Adds an item to the heap and re-heapifies the items if the number of
		 * items exceeds 1.
		 * 
		 * @param {number} item - Used to add an item to an array.
		 */
		push = (item: number) => {
			this.items.push(item);
			if (this.items.length <= 1) return;
			this.heapifyUp();
		};
		/**
		 * @description Returns the largest item in the heap's collection, or `null` if the
		 * heap is empty.
		 * 
		 * @returns {number | null} The first item of an array `items`.
		 */
		peek = (): number | null => {
			if (this.items.length == 0) return null;
			return this.items[0];
		};
		/**
		 * @description Retrieves and returns the topmost element from the heap, while
		 * maintaining the heap property by reassigning the top element to the bottom of the
		 * heap and reheaping it down.
		 * 
		 * @returns {number | null} The value of the top item in the heap.
		 */
		pop = (): number | null => {
			if (this.items.length == 0) return null;
			const item = this.items[0];
			this.items[0] = this.items[this.items.length - 1];
			this.heapifyDown();
			return item;
		};
	}

	/**
	 * @description Extends the `Heap` class and provides two methods for maintaining a
	 * min-heap: `heapifyUp()` and `heapifyDown()`. These methods ensure that the elements
	 * in the heap are arranged in a specific order, with the smallest element at the top
	 * of the heap.
	 * 
	 * @extends {Heap}
	 */
	export class Min extends Heap {
		/**
		 * @description Rearranges elements in a heap-like data structure to maintain the
		 * parent-child relationship and ensure that the root element is always greater than
		 * or equal to its children.
		 */
		protected heapifyUp = () => {
			let index = this.items.length - 1;
			while (
				this.hasParent(index) &&
				this.getParent(index) > this.items[index]
			) {
				this.swap(this.getParentIndex(index), index);
				index = this.getParentIndex(index);
			}
		};

		/**
		 * @description Rearranges elements in a heap-like data structure to maintain the
		 * heap property at each level of the tree. It recursively descends into the tree,
		 * swapping larger elements with smaller child elements until the entire tree is
		 * properly ordered.
		 */
		protected heapifyDown = () => {
			let index = 0;
			while (this.hasL(index)) {
				let smallerChildIndex = this.getLIndex(index);
				if (this.hasR(index) && this.getR(index) < this.getL(index)) {
					smallerChildIndex = this.getRIndex(index);
				}
				if (this.items[index] < this.items[smallerChildIndex]) {
					return;
				}

				this.swap(index, smallerChildIndex);
				index = smallerChildIndex;
			}
		};
	}

	/**
	 * @description Extends `Heap` and provides `heapifyUp()` and `heapifyDown()` methods
	 * to maintain a maximum heap data structure.
	 * 
	 * @extends {Heap}
	 */
	export class Max extends Heap {
		/**
		 * @description Rearranges the elements of an array in descending order based on their
		 * priority, ensuring that the most important element is at the top of the heap.
		 */
		protected heapifyUp = () => {
			let index = this.items.length - 1;
			while (
				this.hasParent(index) &&
				this.getParent(index) < this.items[index]
			) {
				this.swap(this.getParentIndex(index), index);
				index = this.getParentIndex(index);
			}
		};

		/**
		 * @description Rearranges elements in a heap data structure to maintain the heap
		 * property, starting from the root node and working downward.
		 */
		protected heapifyDown = () => {
			let index = 0;
			while (this.hasL(index)) {
				let largerChildIndex = this.getLIndex(index);
				if (this.hasR(index) && this.getR(index) > this.getL(index)) {
					largerChildIndex = this.getRIndex(index);
				}
				if (this.items[index] > this.items[largerChildIndex]) {
					return;
				}

				this.swap(index, largerChildIndex);
				index = largerChildIndex;
			}
		};
	}
}

export default Heap;
