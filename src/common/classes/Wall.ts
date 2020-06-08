import Vector2 from "@common-classes/Vector2";
import Entity from "@common-classes/Entity";

export default class Wall extends Entity {
	public size: Vector2;

	constructor(pos: Vector2, size: Vector2) {
		super(pos);
		this.size = size;
	}

	public get width() {
		return this.size.x;
	}

	public get height() {
		return this.size.y;
	}

	public set(other: Wall) {
		super.set(other);
		this.size.set(other.size.x, other.size.y);
	}
}
