import { Socket, Server, Namespace } from "socket.io";
import Player from "./Player";
import { random, map } from "@common-scripts/utils";
import Vector2 from "@common-classes/Vector2";
import Paddle from "@common-classes/Paddle";
import Ball from "@common-classes/Ball";
import socket from "@client-scripts/socket";
import Side from "@common-enums/Side";
import Move from "@common-enums/Move";

export default class Game {
	public readonly name: string;
	public readonly players: Player[];
	private readonly io: Namespace;
	private readonly tps = 10;

	private readonly size = new Vector2(600, 400);
	private readonly paddles: Map<Side, Paddle> = new Map<Side, Paddle>([
		[Side.Left, new Paddle(new Vector2(), new Vector2(), new Vector2(20, 100))],
		[Side.Right, new Paddle(new Vector2(), new Vector2(), new Vector2(20, 100))],
	]);
	private readonly ball: Ball = new Ball(new Vector2(), new Vector2(), 6);
	private tickTimer: number = -1;

	constructor(name: string, io: Server) {
		this.name = name;
		this.players = [];

		// Current room
		this.io = io.to(this.name);
	}

	public get width() {
		return this.size.x;
	}

	public get height() {
		return this.size.y;
	}

	public get isEmpty() {
		return this.players.length == 0;
	}

	public addPlayer(socket: Socket) {
		// Choose player side
		const side =
			this.players.length === 0
				? Side.Left
				: this.players[0].side === Side.Left
				? Side.Right
				: Side.Left;

		// Make new player and add to player list
		const player = new Player(socket, side, this, this.paddles.get(side));
		this.players.push(player);

		// Add player to (socket)room
		socket.join(this.name);

		// Tell client what side the player is (left | right)
		// socket.emit("side", player.side);

		socket.on("move", (direction: Move) => {
			player.move = direction;
		});
	}

	public removePlayer(player: Socket) {
		const playerIndex = this.players.findIndex(p => p.socket == player);
		console.log(playerIndex);
		if (playerIndex === -1) return;

		this.players.splice(playerIndex, 1);
		player.leave(this.name);
		this.io.emit("end");
		clearInterval(this.tickTimer);
	}

	public startGame() {
		const maxAngle = Math.PI / 6;
		const angle = random([
			random(-maxAngle, maxAngle),
			random(Math.PI - maxAngle, Math.PI + maxAngle),
		]);
		const r = 40;
		const ballSpeed = new Vector2(r * Math.cos(angle), r * Math.sin(angle));
		this.ball.speed.set(ballSpeed);

		const padding = this.paddles.get(Side.Left).size.x;
		const centerOffset = this.width / 2 - padding;
		this.paddles.get(Side.Left).pos.set(-centerOffset, 0);
		this.paddles.get(Side.Right).pos.set(centerOffset, 0);
		this.ball.pos.set(0, 0);

		this.io.emit("start", { tps: this.tps, ball: this.ball, size: this.size });
		this.io.emit("ball", { pos: this.ball.pos, speed: this.ball.speed });
		this.paddles.forEach(({ pos, speed, size }, side) => {
			this.io.emit("paddle", { pos, speed, size }, side);
		});

		if (this.tickTimer !== -1) clearInterval(this.tickTimer);
		this.tickTimer = <number>(<unknown>setInterval(() => this.tick(), 1000 / this.tps));
	}

	private tick() {
		this.ball.pos.add(this.ball.speed);

		if (this.ball.pos.y <= -this.height / 2 || this.ball.pos.y >= this.height / 2) {
			this.ball.speed.set(this.ball.speed.x, -this.ball.speed.y);
			this.io.emit("ball", this.ball);
		}

		if (this.ball.pos.x <= -this.width / 2 || this.ball.pos.x >= this.width / 2) {
			this.ball.speed.set(-this.ball.speed.x, this.ball.speed.y);
			this.io.emit("ball", this.ball);
		}

		const playerSpeed = 10;
		for (const player of this.players) {
			if (player.move === Move.None) continue;

			switch (player.move) {
				case Move.Up:
					player.paddle.pos.add(0, -playerSpeed);
					break;

				case Move.Down:
					player.paddle.pos.add(0, playerSpeed);
					break;
			}

			const { pos, speed, size } = player.paddle;
			this.io.emit("paddle", { pos, speed, size }, player.side);
		}
	}
}
