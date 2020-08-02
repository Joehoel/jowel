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
			style="overflow: visible;"
		>
			<rect :x="-size.x/2" :y="-size.y/2" :width="size.x" :height="size.y" fill="#000" />
			<line
				x1="0"
				:y1="-size.y/2"
				x2="0"
				:y2="size.y/2"
				stroke="#fff"
				stroke-width="5"
				stroke-dasharray="16"
			/>
			<!-- <rect
				v-for="(wall, index) in walls"
				:key="`wall-${index}`"
				:x="wall.pos.x - wall.size.x / 2"
				:y="wall.pos.y - wall.size.y / 2"
				:width="wall.size.x"
				:height="wall.size.y"
				fill="transparent"
				stroke="red"
				stroke-width="2"
			/>-->
			<rect
				v-for="(paddle, index) in paddles.values()"
				:key="`paddle-${index}`"
				:transform="`translate(${paddle.pos.x - paddle.size.x /2},${paddle.pos.y - paddle.size.y/2})`"
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
import Wall from "@common-classes/Wall";

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
	private readonly walls: Wall[] = [];

	private started = false;
	private loop: number;
	private tps: number = 0;
	private pressedKeys: Move[] = [Move.None];
	private lastMove: Move = Move.None;
	private keycodeToMove: Map<number, Move>;

	private mounted() {
		socket.emit("join", { game: "pong" });
		socket.on("message", console.log);

		this.keycodeToMove = new Map<number, Move>([
			[38, Move.Up],
			[40, Move.Down],
		]);

		socket.on(
			"start",
			({
				tps,
				ball,
				size,
				walls,
			}: {
				tps: number;
				ball: Ball;
				size: { x: number; y: number };
				walls: Wall[];
			}) => {
				this.loading = false;
				this.size.set(size.x, size.y);
				this.started = true;
				window.addEventListener("keydown", this.handleKeydown);
				window.addEventListener("keyup", this.handleKeyup);
				this.ball.set(ball);
				walls.forEach(wall => {
					this.walls.push(
						new Wall(
							new Vector2(wall.pos.x, wall.pos.y),
							new Vector2(wall.size.x, wall.size.y)
						)
					);
				});
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
		this.paddles.forEach(paddle => paddle.pos.add(paddle.speed));
	}

	private handleKeydown(e: KeyboardEvent) {
		const move = this.keycodeToMove.get(e.keyCode);
		if (this.pressedKeys.includes(move)) return;

		this.pressedKeys.push(move);
		this.updateLastMove();
	}

	private handleKeyup(e: KeyboardEvent) {
		const move = this.keycodeToMove.get(e.keyCode);
		if (!this.pressedKeys.includes(move)) return;

		this.pressedKeys.splice(this.pressedKeys.indexOf(move), 1);
		this.updateLastMove();
	}

	private updateLastMove() {
		if (this.pressedKeys[this.pressedKeys.length - 1] !== this.lastMove) {
			this.lastMove = this.pressedKeys[this.pressedKeys.length - 1];
			socket.emit("move", this.lastMove);
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
