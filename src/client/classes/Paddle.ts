export default class Paddle {
	private isLeft: boolean;
	public x: number;
	public y: number;
	private width: number;
	private height: number;
	private yChange: number;
	public readonly canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	constructor(isLeft: boolean, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		this.isLeft = isLeft;
		this.width = 20;
		this.height = 100;
		this.yChange = 0;
		this.ctx = ctx;
		this.canvas = canvas;
		this.y = this.canvas.height / 2 - this.height / 2;

		if (this.isLeft) {
			this.x = this.width - this.width / 2;
		} else {
			this.x = this.canvas.width - this.width * 1.5;
		}
	}

	public show() {
		this.ctx.fillStyle = "#ffffff";
		this.ctx.fillRect(this.x, this.y, this.width, this.height);
		// rect(this.x, this.y, this.width, this.height);
	}

	public update() {
		this.y += this.yChange;
		// this.y = this.constrain(this.y, this.height, this.canvas.height);
		if (this.y <= 0) {
			this.y = 0;
		} else if (this.y >= this.canvas.height - this.height) {
			this.y = this.canvas.height - this.height;
		}
	}

	public move(steps: number) {
		this.yChange = steps;
	}

	// private constrain(n: number, high: number, low: number) {
	// 	return Math.max(Math.min(n, high), low);
	// }
}
