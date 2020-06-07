import Vector2 from "@common-classes/Vector2";
import Entity from "./Entity";

export default class Ball extends Entity {
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
