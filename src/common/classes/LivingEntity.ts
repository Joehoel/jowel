import Vector2 from "@common-classes/Vector2";
import Entity from "@common-classes/Entity";

export default abstract class LivingEntity extends Entity {
	public speed: Vector2;

	constructor(pos: Vector2, speed: Vector2 = new Vector2()) {
		super(pos);
		this.speed = speed;
	}

	public set(other: LivingEntity) {
		super.set(other);
		this.speed.set(other.speed.x, other.speed.y);
	}
}
