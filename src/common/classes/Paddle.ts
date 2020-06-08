import Vector2 from "@common-classes/Vector2";
import LivingEntity from "@common-classes/LivingEntity";

export default class Paddle extends LivingEntity {
	public size: Vector2;

	constructor(pos: Vector2, speed: Vector2, size: Vector2) {
		super(pos, speed);
		this.size = size;
	}

	public get width() {
		return this.size.x;
	}

	public get height() {
		return this.size.y;
	}

	public set(other: Paddle) {
		super.set(other);
		this.size.set(other.size.x, other.size.y);
	}
}