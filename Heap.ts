namespace Heap {
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
		protected swap = (a: number, b: number) => {
			[this.items[a], this.items[b]] = [this.items[b], this.items[a]];
		};

		protected heapifyUp!: () => void;
		protected heapifyDown!: () => void;

		push = (item: number) => {
			this.items.push(item);
			if (this.items.length <= 1) return;
			this.heapifyUp();
		};
		peek = (): number | null => {
			if (this.items.length == 0) return null;
			return this.items[0];
		};
		pop = (): number | null => {
			if (this.items.length == 0) return null;
			const item = this.items[0];
			this.items[0] = this.items[this.items.length - 1];
			this.heapifyDown();
			return item;
		};
	}

	export class Min extends Heap {
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

	export class Max extends Heap {
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
