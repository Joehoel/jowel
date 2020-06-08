<template>
	<main class="center">
		<!-- <Back route="/" /> -->
		<div v-if="loading" class="loading">
			<span class="message">Waiting for another player...</span>
			<Loader />
		</div>

		<svg
			v-else
			:width="size.x"
			:height="size.y"
			:viewBox="`${-size.x/2} ${-size.y/2} ${size.x} ${size.y}`"
			class="game"
		>
			<rect x="-300" y="-200" :width="size.x" :height="size.y" fill="#000" />
			<rect
				v-for="(paddle,index) in paddles.values()"
				:key="index"
				:x="paddle.pos.x - paddle.size.x / 2"
				:y="paddle.pos.y - paddle.size.y / 2"
				:width="paddle.size.x"
				:height="paddle.size.y"
				fill="#fff"
			/>

			<circle
				fill="#fff"
				cx="0"
				cy="0"
				:transform="`translate(${ball.pos.x},${ball.pos.y})`"
				:r="ball.radius"
				:style="{transition: `transform ${1000 / tps}ms linear`}"
				class="ball"
			/>
		</svg>
		<!-- <Footer /> -->
	</main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import socket from "@client-scripts/socket";

import Footer from "@client-components/Footer.vue";
import Back from "@client-components/Back.vue";
import Loader from "@client-components/Loader.vue";

import { line, circle } from "@common-scripts/utils";
import Vector2 from "@common-classes/Vector2";
import Ball from "@common-classes/Ball";
import Paddle from "@common-classes/Paddle";
import Side from "@common-enums/Side";
import Move from "@common-enums/Move";

@Component({
	components: {
		Footer,
		Back,
		Loader,
	},
})
export default class Pong extends Vue {
	private loading: boolean = true;

	private readonly size = new Vector2();

	private readonly ball: Ball = new Ball(new Vector2(), new Vector2(1, 1), 6);
	private readonly paddles: Map<Side, Paddle> = new Map<Side, Paddle>([
		[Side.Left, new Paddle(new Vector2(), new Vector2(), new Vector2())],
		[Side.Right, new Paddle(new Vector2(), new Vector2(), new Vector2())],
	]);

	private started = false;
	private loop: number;
	private tps: number = 0;
	private pressedKeys: Set<Move>;

	private mounted() {
		this.pressedKeys = new Set();

		socket.on("message", console.log);

		socket.on(
			"start",
			({ tps, ball, size }: { tps: number; ball: Ball; size: { x: number; y: number } }) => {
				this.loading = false;
				this.size.set(size.x, size.y);
				this.started = true;
				window.addEventListener("keydown", this.handleKeydown);
				window.addEventListener("keyup", this.handleKeyup);
				this.ball.set(ball);
				this.tps = tps;
				this.loop = <number>(<unknown>setInterval(() => this.tick(), 1000 / tps));
			}
		);

		socket.on("ball", (ball: Ball) => {
			this.ball.set(ball);
		});

		socket.on("paddle", (paddle: Paddle, side: Side) => {
			this.paddles.get(side).set(paddle);
		});

		socket.on("end", () => {
			this.loading = true;
			this.reset();
		});
	}

	private destroyed() {
		this.reset();
	}

	private reset() {
		window.removeEventListener("keydown", this.handleKeydown);
		window.removeEventListener("keyup", this.handleKeyup);
		clearInterval(this.loop);
	}

	private tick() {
		this.ball.pos.add(this.ball.speed);
	}

	private handleKeydown(e: KeyboardEvent) {
		switch (e.keyCode) {
			case 38:
				this.pressedKeys.add(Move.Up);
				socket.emit("move", Move.Up);
				break;
			case 40:
				this.pressedKeys.add(Move.Down);
				socket.emit("move", Move.Down);
				break;
		}
	}

	private handleKeyup(e: KeyboardEvent) {
		switch (e.keyCode) {
			case 38:
				this.pressedKeys.delete(Move.Up);
				break;
			case 40:
				this.pressedKeys.delete(Move.Down);
				break;
		}

		if (this.pressedKeys.size === 0) {
			socket.emit("move", Move.None);
		}
	}
}
</script>

<style lang="scss">
.loading {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	.message {
		margin-bottom: 2rem;
	}
}

.game {
	box-sizing: content-box;
	border: 4px solid rgb(73, 73, 73);
	box-shadow: 0px 0px 9px 3px rgba(0, 0, 0, 0.31);
}
</style>
