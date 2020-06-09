import Vector2 from "@common-classes/Vector2";
import LivingEntity from "@common-classes/LivingEntity";
import Wall from "@common-classes/Wall";

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

	public collides(wall: Wall) {
		return (
			this.pos.x - this.size.x / 2 < wall.pos.x - wall.size.x / 2 + wall.size.x &&
			this.pos.x - this.size.x / 2 + this.size.x > wall.pos.x - wall.size.x / 2 &&
			this.pos.y - this.size.y / 2 < wall.pos.y - wall.size.y / 2 + wall.size.y &&
			this.pos.y - this.size.y / 2 + this.size.y > wall.pos.y - wall.size.y / 2
		);
	}
}
