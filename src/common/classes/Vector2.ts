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

	public add(vector: Vector2): void;
	public add(x: number, y: number): void;
	public add(xOrVector: number | Vector2, y?: number) {
		if (xOrVector instanceof Vector2) {
			this.x += xOrVector.x;
			this.y += xOrVector.y;
		} else {
			this.x += xOrVector;
			this.y += y;
		}
	}

	public multiply(vector: Vector2): void;
	public multiply(x: number, y: number): void;
	public multiply(xOrVector: number | Vector2, y?: number) {
		if (xOrVector instanceof Vector2) {
			this.x *= xOrVector.x;
			this.y *= xOrVector.y;
		} else {
			this.x *= xOrVector;
			this.y *= y;
		}
	}

	public subtract(vector: Vector2): void;
	public subtract(x: number, y: number): void;
	public subtract(xOrVector: number | Vector2, y?: number) {
		if (xOrVector instanceof Vector2) {
			this.x -= xOrVector.x;
			this.y -= xOrVector.y;
		} else {
			this.x -= xOrVector;
			this.y -= y;
		}
	}

	public setAngle(angle: number) {
		const magnitude = this.getMagnitude();
		this.x = Math.cos(angle) * magnitude;
		this.y = Math.sin(angle) * magnitude;
	}

	public getAngle() {
		return Math.atan(this.y / this.x);
	}

	public getMagnitude() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	public setMagnitude(magnitude: number) {
		const oldMagnitude = this.getMagnitude();
		this.x = (this.x / oldMagnitude) * magnitude;
		this.y = (this.y / oldMagnitude) * magnitude;
	}

	public normalize() {
		this.setMagnitude(1);
	}
}
