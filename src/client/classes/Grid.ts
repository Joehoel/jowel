import Vector2 from "@common-classes/Vector2";

export default class Grid {
	public scale: number;
	public size: Vector2;

	constructor(scale: number, size: Vector2) {
		this.scale = scale;
		this.size = size;
	}

	public get rows() {
		return this.size.x / this.scale;
	}
	public get columns() {
		return this.size.y / this.scale;
	}
}
