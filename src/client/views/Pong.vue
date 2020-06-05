<template>
	<main>
		<Back route="/" />
		<canvas ref="canvas" width="600" height="400" style="background-color: black;"></canvas>
		<Footer />
	</main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import socket from "@client-scripts/socket";

import Footer from "@client-components/Footer.vue";
import Back from "@client-components/Back.vue";

import Paddle from "@client-classes/Paddle";

import { line, circle } from "@common-scripts/utils";
import Vector2 from "@common-classes/Vector2";
import Ball from "@common-classes/Ball";

@Component({
	components: {
		Footer,
		Back,
	},
})
export default class Pong extends Vue {
	$refs!: { canvas: HTMLCanvasElement };
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private size: Vector2;

	private left: Paddle;
	private right: Paddle;
	private ball: Ball;

	private started = false;
	private loop: number;

	mounted() {
		socket.on("message", console.log);
		this.canvas = this.$refs.canvas;
		// this.middle = new Vector2(this.canvas.width / 2, this.canvas.height / 2);
		this.ctx = this.canvas.getContext("2d")!;
		// this.left = new Paddle(true, this.canvas, this.ctx);
		// this.right = new Paddle(false, this.canvas, this.ctx);

		// socket.on("side", (side: any) => {
		// 	console.log(side);
		// });

		// socket.on("move-left", (direction: number) => {
		// 	this.left.move(direction);
		// });

		// socket.on("move-right", (direction: number) => {
		// 	this.right.move(direction);
		// });

		socket.on(
			"start",
			({ tps, ball, size }: { tps: number; ball: Ball; size: { x: number; y: number } }) => {
				this.size = new Vector2(size.x, size.y);
				// Start game
				// this.ball = new Ball(this.canvas, this.ctx);
				this.started = true;
				window.addEventListener("keydown", this.handleKeydown);
				window.addEventListener("keyup", this.handleKeyup);
				this.ball = new Ball(
					new Vector2(ball.pos.x, ball.pos.y),
					new Vector2(ball.speed.x, ball.speed.y),
					ball.radius
				);
				this.loop = <number>(<unknown>setInterval(() => this.tick(), 1000 / tps));
			}
		);

		socket.on("ball", (ball: Ball) => {
			this.ball = new Ball(
				new Vector2(ball.pos.x, ball.pos.y),
				new Vector2(ball.speed.x, ball.speed.y),
				ball.radius
			);
			// this.ball.pos.set(ball.pos);
			// this.ball.speed.set(ball.speed);
			// this.ball.radius = ball.radius;
		});
	}

	destroyed() {
		window.removeEventListener("keydown", this.handleKeydown);
		window.removeEventListener("keyup", this.handleKeyup);
		clearInterval(this.loop);
	}

	tick() {
		// update
		// this.left.update();
		// this.right.update();
		// this.ball.update();
		this.draw();

		this.ball.pos.add(this.ball.speed);
		this.drawBall();

		// draw
	}

	drawBall() {
		circle(
			this.ctx,
			this.size.x / 2 + this.ball.pos.x,
			this.size.y / 2 + this.ball.pos.y,
			this.ball.radius
		);
	}

	draw() {
		this.ctx.fillStyle = "#000000";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.strokeStyle = "#ffffff";

		// this.right.show();
		// this.left.show();
		// this.ball.show();

		// this.ball.edges();
		// this.ball.update();
		// this.ball.edges();

		let y1 = 0;
		let y2 = 20;

		for (let i = 0; i <= this.canvas.height; i++) {
			line(this.ctx, 6, this.size.x / 2, y1, this.size.x / 2, y2);
			y1 += 40;
			y2 += 40;
		}
	}

	handleKeydown(e: KeyboardEvent) {
		switch (e.keyCode) {
			case 38:
				socket.emit("move", -2);
				break;
			case 40:
				socket.emit("move", 2);
				break;
			default:
				socket.emit("move", 0);
				break;
		}
	}
	handleKeyup(e: KeyboardEvent) {
		switch (e.keyCode) {
			case 38:
				socket.emit("move", 0);
				break;
			case 40:
				socket.emit("move", 0);
				break;
		}
	}
}
</script>

<style lang="scss">
</style>
