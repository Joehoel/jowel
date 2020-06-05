import { Socket, Server, Namespace } from "socket.io";
import Player, { Side } from "./Player";
import { random } from "@common-scripts/utils";
import Vector2 from "@common-classes/Vector2";
import Paddle from "./Paddle";
import Ball from "@common-classes/Ball";

export default class Game {
	public readonly name: string;
	public readonly players: Player[];

	private readonly io: Namespace;
	private readonly tps = 60;

	private readonly size = new Vector2(600, 400);
	private readonly paddles: [Paddle, Paddle] = [
		new Paddle(new Vector2(), new Vector2(), new Vector2(20, 100), true),
		new Paddle(new Vector2(), new Vector2(), new Vector2(20, 100), false),
	];
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

	public addPlayer(socket: Socket) {
		// Choose player side
		const side =
			this.players.length === 0
				? Side.Left
				: this.players[0].side === Side.Left
				? Side.Right
				: Side.Left;

		// Make new player and add to player list
		const player = new Player(socket, side, this);

		this.players.push(player);

		// Add player to (socket)room
		socket.join(this.name);

		// Tell client what side the player is (left | right)
		socket.emit("side", player.side);

		socket.on("move", direction => {
			if (player.side === Side.Left) {
				this.io.emit("move-left", direction);
			} else {
				this.io.emit("move-right", direction);
			}
		});
	}

	public startGame() {
		const maxAngle = Math.PI / 6;
		const angle = random([
			random(-maxAngle, maxAngle),
			random(Math.PI - maxAngle, Math.PI + maxAngle),
		]);
		const r = 2;
		const ballSpeed = new Vector2(r * Math.cos(angle), r * Math.sin(angle));
		this.ball.speed.set(ballSpeed);

		const padding = this.paddles[0].width / 2;
		const centerOffset = this.width / 2 - padding;
		this.paddles[0].pos.set(-centerOffset, 0);
		this.paddles[1].pos.set(centerOffset, 0);
		this.ball.pos.set(0, 0);

		this.io.emit("start", { tps: this.tps, ball: this.ball, size: this.size });
		this.io.emit("ball", { pos: this.ball.pos, speed: this.ball.speed });
		this.io.emit("paddle", {
			isLeft: true,
			pos: this.paddles[0].pos,
			speed: this.paddles[0].speed,
		});
		this.io.emit("paddle", {
			isLeft: false,
			pos: this.paddles[1].pos,
			speed: this.paddles[1].speed,
		});
		if (this.tickTimer !== -1) clearInterval(this.tickTimer);
		this.tickTimer = setInterval(() => this.tick(), 1000 / this.tps);
	}

	private tick() {
		if (this.ball.pos.y <= -this.height / 2 || this.ball.pos.y >= this.height / 2) {
			this.ball.speed.set(this.ball.speed.x, -this.ball.speed.y);
			this.io.emit("ball", this.ball);
		}

		if (this.ball.pos.x <= -this.width / 2 || this.ball.pos.x >= this.width / 2) {
			this.ball.speed.set(-this.ball.speed.x, this.ball.speed.y);
			this.io.emit("ball", this.ball);
		}

		this.ball.pos.add(this.ball.speed);
	}
}
