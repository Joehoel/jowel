import Vector2 from "@common-classes/Vector2";
import LivingEntity from "@common-classes/LivingEntity";

export default class Ball extends LivingEntity {
	public radius: number;
	constructor(pos: Vector2, speed: Vector2, radius: number) {
		super(pos, speed);
		this.radius = radius;
	}

	public set(other: Ball) {
		super.set(other);
		this.radius = other.radius;
	}
}
