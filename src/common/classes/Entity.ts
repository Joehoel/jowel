import Vector2 from "@common-classes/Vector2";

export default class Entity {
	public pos: Vector2;
	public speed: Vector2;

	constructor(pos: Vector2, speed: Vector2) {
		this.pos = pos;
		this.speed = speed;
	}
}
