import { random, radians, map, circle } from "@common-scripts/utils";
import Paddle from "@client-classes/Paddle";

export default class Ball {
	private x: number;
	private y: number;
	private r: number;
	public xSpeed: number;
	public ySpeed: number;
	private acc: number;
	private ctx: CanvasRenderingContext2D;
	private canvas: HTMLCanvasElement;

	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.x = this.canvas.width / 2;
		this.y = this.canvas.height / 2;
		this.r = 6;
		this.xSpeed = 0;
		this.ySpeed = 0;
		this.reset();
		this.acc = 1.5;
	}

	show() {
		circle(this.ctx, this.x, this.y, this.r);
	}

	reset() {
		this.x = this.canvas.width / 2;
		this.y = this.canvas.height / 2;

		const angle = random(-Math.PI / 4, Math.PI / 4);
		this.xSpeed = 5 * Math.cos(angle);
		this.ySpeed = 5 * Math.sin(angle);

		if (random(0, 1) < 0.5) {
			this.xSpeed *= -1;
		}
	}

	// move(xSpeed: number, ySpeed: number) {
	// 	this.x += xSpeed;
	// 	this.y += ySpeed;
	// }

	accelerate() {
		this.xSpeed *= this.acc;
		this.ySpeed *= this.acc;
	}

	update() {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
	}

	edges() {
		if (this.y < 0 || this.y > this.canvas.height) {
			this.ySpeed *= -1;
		}

		if (this.x - this.r > this.canvas.width) {
			// leftscore++;
			this.reset();
		}

		if (this.x + this.r < 0) {
			// rightscore++;
			this.reset();
		}
	}

	checkLeft(p: Paddle) {
		if (
			this.y - this.r < p.y + p.canvas.height / 2 &&
			this.y + this.r > p.y - p.canvas.height / 2 &&
			this.x - this.r < p.x + p.canvas.width / 2
		) {
			if (this.x > p.x) {
				const diff = this.y - (p.y - p.canvas.height / 2);
				const rad = radians(45);
				const angle = map(diff, 0, p.canvas.height, -rad, rad);
				this.xSpeed = 5 * Math.cos(angle) * this.acc;
				this.ySpeed = 5 * Math.sin(angle) * this.acc;
				this.x = p.x + p.canvas.width / 2 + this.r;
				this.accelerate();
			}
		}
	}
	checkRight(p: Paddle) {
		if (
			this.y - this.r < p.y + p.canvas.height / 2 &&
			this.y + this.r > p.y - p.canvas.height / 2 &&
			this.x + this.r > p.x - p.canvas.width / 2
		) {
			if (this.x < p.x) {
				const diff = this.y - (p.y - p.canvas.height / 2);
				const angle = map(diff, 0, p.canvas.height, radians(225), radians(135));
				this.xSpeed = 5 * Math.cos(angle) * this.acc;
				this.ySpeed = 5 * Math.sin(angle) * this.acc;
				this.x = p.x - p.canvas.width / 2 - this.r;
				this.accelerate();
			}
		}
	}
}
