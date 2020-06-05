import Vector2 from "@common-classes/Vector2";
import Entity from "@common-classes/Entity";

export default class Paddle extends Entity {
	public size: Vector2;
	public isLeft: boolean;
	constructor(pos: Vector2, speed: Vector2, size: Vector2, isLeft: boolean) {
		super(pos, speed);
		this.size = size;
		this.isLeft = isLeft;
	}
	public get width() {
		return this.size.x;
	}
	public get height() {
		return this.size.y;
	}
}
