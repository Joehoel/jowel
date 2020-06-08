import Vector2 from "@common-classes/Vector2";

export default abstract class Entity {
	public pos: Vector2;

	constructor(pos: Vector2) {
		this.pos = pos;
	}

	public set(other: Entity) {
		this.pos.set(other.pos.x, other.pos.y);
	}
}
