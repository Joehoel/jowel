// import Vector2 from "@common-classes/Vector2";
// import Grid from "./Grid";

// export default class Snake {
// 	private x: number;
// 	private y: number;
// 	private xs: number;
// 	private ys: number;
// 	private total: number;
// 	private tail: Vector2[];

// 	private ctx: CanvasRenderingContext2D;

// 	constructor(ctx: CanvasRenderingContext2D) {
// 		this.x = (Math.floor(Math.random() * Grid.rows - 1) + 1) * Grid.scale;
// 		this.y = (Math.floor(Math.random() * Grid.columns - 1) + 1) * Grid.scale;

// 		this.xs = Grid.scale * 1;
// 		this.ys = 0;

// 		this.total = 0;
// 		this.tail = [];

// 		this.ctx = ctx;
// 		// this._direction;
// 	}

// 	draw() {
// 		this.ctx.fillStyle = "#FFFFFF";
// 		for (let i = 0; i < this.tail.length; i++) {
// 			this.ctx.fillRect(this.tail[i].x, this.tail[i].y, Grid.scale, Grid.scale);
// 		}
// 		this.ctx.fillRect(this.x, this.y, Grid.scale, Grid.scale);
// 	}

// 	update() {
// 		for (let i = 0; i < this.tail.length - 1; i++) {
// 			this.tail[i] = this.tail[i + 1];
// 		}

// 		this.tail[this.total - 1] = new Vector2(this.x, this.y);

// 		this.x += this.xs;
// 		this.y += this.ys;

// 		if (this.x >= Grid.scale) {
// 			this.x = 0;
// 		} else if (this.x < 0) {
// 			this.x = Grid.scale;
// 		} else if (this.y >= Grid.scale) {
// 			this.y = 0;
// 		} else if (this.y < 0) {
// 			this.y = Grid.scale;
// 		}
// 	}

// 	eat(fruit: Vector2): boolean {
// 		if (this.x == fruit.x && this.y == fruit.y) {
// 			this.total++;
// 			return true;
// 		}

// 		return false;
// 	}

// 	check() {
// 		for (let i = 0; i < this.tail.length; i++) {
// 			if (this.x == this.tail[i].x && this.y == this.tail[i].y) {
// 				// Storage.setHighscore(this.total);
// 				// updateHighscore(currentUser.uid, this.total);
// 				this.total = 0;
// 				this.tail = [];
// 				clearInterval(loop);
// 				// started = false;
// 				// message.textContent = "You died, press any key to try again...";
// 			}
// 		}
// 	}

// 	steer(direction) {
// 		switch (direction) {
// 			case "up":
// 				if (this.ys !== Grid.scale) {
// 					this.xs = 0;
// 					this.ys = -Grid.scale;
// 				}
// 				break;
// 			case "right":
// 				if (this.xs !== -Grid.scale) {
// 					this.xs = Grid.scale;
// 					this.ys = 0;
// 				}
// 				break;
// 			case "down":
// 				if (this.ys !== -Grid.scale) {
// 					this.xs = 0;
// 					this.ys = Grid.scale;
// 				}
// 				break;
// 			case "left":
// 				if (this.xs !== Grid.scale) {
// 					this.xs = -Grid.scale;
// 					this.ys = 0;
// 				}
// 				break;
// 			default:
// 				break;
// 		}
// 	}
// }
