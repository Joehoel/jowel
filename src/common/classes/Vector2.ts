export default class Vector2 {
	public x: number;
	public y: number;

	constructor();
	constructor(x: number, y: number);
	constructor(x?: number, y?: number) {
		if (typeof x === "undefined") {
			this.x = 0;
			this.y = 0;
		} else {
			this.x = x;
			this.y = y;
		}
	}

	public set(vector: Vector2): void;
	public set(x: number, y: number): void;
	public set(xOrVector: number | Vector2, y?: number) {
		if (xOrVector instanceof Vector2) {
			this.x = xOrVector.x;
			this.y = xOrVector.y;
		} else {
			this.x = xOrVector;
			this.y = y;
		}
	}

	public add(other: Vector2) {
		this.x += other.x;
		this.y += other.y;
	}
}
