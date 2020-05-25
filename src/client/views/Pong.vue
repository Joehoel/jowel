<template>
	<main>
		<Back route="/" />
		<canvas ref="canvas" width="600" height="400"></canvas>
		<Footer />
	</main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Vector2 from "@common-classes/Vector2";
import Footer from "@client-components/Footer.vue";
import Back from "@client-components/Back.vue";
import Paddle from "@client-classes/Paddle";
import socket from "@client-scripts/socket";
import { line } from "@common-scripts/utils";
import Ball from "@client-classes/Ball";

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

	private left: Paddle;
	private right: Paddle;
	private ball: Ball;

	private middle: Vector2;

	private started = false;
	private loop: number;

	mounted() {
		this.canvas = this.$refs.canvas;
		this.middle = new Vector2(this.canvas.width / 2, this.canvas.height / 2);
		this.ctx = this.canvas.getContext("2d")!;
		this.left = new Paddle(true, this.canvas, this.ctx);
		this.right = new Paddle(false, this.canvas, this.ctx);

		socket.on("side", (side: any) => {
			console.log(side);
		});

		socket.on("move-left", (direction: number) => {
			this.left.move(direction);
		});

		socket.on("move-right", (direction: number) => {
			this.right.move(direction);
		});

		socket.on("start", (tps: number) => {
			// Start game
			this.ball = new Ball(this.canvas, this.ctx);
			this.started = true;
			window.addEventListener("keydown", this.handleKeydown);
			window.addEventListener("keyup", this.handleKeyup);
			this.loop = <number>(<unknown>setInterval(this.tick, 1000 / tps));
		});

		// socket.on("ball", (ball: Vector) => {});
	}

	destroyed() {
		window.removeEventListener("keydown", this.handleKeydown);
		window.removeEventListener("keyup", this.handleKeyup);
		clearInterval(this.loop);
	}

	tick() {
		// update
		this.left.update();
		this.right.update();
		this.ball.update();

		// draw
		this.draw();
	}

	draw() {
		this.ctx.fillStyle = "#000000";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.strokeStyle = "#ffffff";

		this.right.show();
		this.left.show();
		this.ball.show();

		// this.ball.edges();
		// this.ball.update();
		// this.ball.edges();

		let y1 = 0;
		let y2 = 20;

		for (let i = 0; i <= this.canvas.height; i++) {
			line(this.ctx, 6, this.middle.x, y1, this.middle.x, y2);
			y1 += 40;
			y2 += 40;
		}
	}

	handleKeydown(e: KeyboardEvent) {
		switch (e.keyCode) {
			case 38:
				socket.emit("move", -10);
				break;
			case 40:
				socket.emit("move", 10);
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
main {
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	flex-direction: column;

	width: 100vw;
	height: 100vh;

	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
		"Open Sans", "Helvetica Neue", sans-serif;
}
a,
a:visited {
	color: black;
	text-decoration: none;
}
</style>
