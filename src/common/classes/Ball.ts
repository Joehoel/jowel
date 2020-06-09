import Vector2 from "@common-classes/Vector2";
import LivingEntity from "@common-classes/LivingEntity";
import Wall from "./Wall";

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

	public collides(wall: Wall) {
		return (
			this.pos.x - this.radius < wall.pos.x - wall.size.x / 2 + wall.size.x &&
			this.pos.x + this.radius > wall.pos.x - wall.size.x / 2 &&
			this.pos.y - this.radius < wall.pos.y - wall.size.y / 2 + wall.size.y &&
			this.pos.y + this.radius > wall.pos.y - wall.size.y / 2
		);
	}
}
