import { Socket, Server, Namespace } from "socket.io";
import Player from "./Player";
import { random, map } from "@common-scripts/utils";
import Vector2 from "@common-classes/Vector2";
import Paddle from "@common-classes/Paddle";
import Ball from "@common-classes/Ball";
import Side from "@common-enums/Side";
import Move from "@common-enums/Move";
import Wall from "@common-classes/Wall";

export default class Game {
	public readonly name: string;
	public readonly players: Player[];
	private readonly io: Namespace;
	private readonly tps = 120;

	private readonly size = new Vector2(600, 400);
	private readonly paddles: Map<Side, Paddle> = new Map<Side, Paddle>([
		[Side.Left, new Paddle(new Vector2(), new Vector2(), new Vector2(20, 100))],
		[Side.Right, new Paddle(new Vector2(), new Vector2(), new Vector2(20, 100))],
	]);
	private readonly walls: Wall[];
	private readonly ball: Ball = new Ball(new Vector2(), new Vector2(), 6);
	private tickTimer: number = -1;
	private changedPaddles: Set<Paddle> = new Set<Paddle>();
	private changedBall = false;

	constructor(name: string, io: Server) {
		this.name = name;
		this.players = [];

		const wallSize = new Vector2(2 * this.width, this.height);

		this.walls = [
			new Wall(
				new Vector2(0, -this.height / 2 - wallSize.y / 2),
				new Vector2(wallSize.x, wallSize.y)
			),
			new Wall(
				new Vector2(this.width / 2 + wallSize.y / 2, 0),
				new Vector2(wallSize.y, wallSize.x)
			),
			new Wall(
				new Vector2(0, this.height / 2 + wallSize.y / 2),
				new Vector2(wallSize.x, wallSize.y)
			),
			new Wall(
				new Vector2(-this.width / 2 - wallSize.y / 2, 0),
				new Vector2(wallSize.y, wallSize.x)
			),
		];

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

		const paddleSpeed = 400 / this.tps;
		socket.on("move", (direction: Move) => {
			switch (direction) {
				case Move.Down:
					player.paddle.speed.set(0, paddleSpeed);
					break;
				case Move.Up:
					player.paddle.speed.set(0, -paddleSpeed);
					break;
				default:
					player.paddle.speed.set(0, 0);
			}
			this.changedPaddles.add(player.paddle);
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
		const r = 400 / this.tps;
		const ballSpeed = new Vector2(r * Math.cos(angle), r * Math.sin(angle));
		this.ball.speed.set(ballSpeed);

		const padding = this.paddles.get(Side.Left).size.x;
		const centerOffset = this.width / 2 - padding;
		this.paddles.get(Side.Left).pos.set(-centerOffset, 0);
		this.paddles.get(Side.Right).pos.set(centerOffset, 0);
		this.ball.pos.set(0, 0);

		this.io.emit("start", {
			tps: this.tps,
			ball: this.ball,
			size: this.size,
			walls: this.walls,
		});
		this.io.emit("ball", { pos: this.ball.pos, speed: this.ball.speed });
		this.paddles.forEach(({ pos, speed, size }, side) => {
			this.io.emit("paddle", { pos, speed, size }, side);
		});

		if (this.tickTimer !== -1) clearInterval(this.tickTimer);
		this.tickTimer = <number>(<unknown>setInterval(() => this.tick(), 1000 / this.tps));
	}

	private tick() {
		const [topWall, rightWall, bottomWall, leftWall] = this.walls;

		// check paddle wall collides
		this.paddles.forEach(paddle => {
			paddle.pos.add(paddle.speed);
			if (paddle.collides(topWall) || paddle.collides(bottomWall)) {
				paddle.pos.subtract(paddle.speed);
				paddle.speed.set(0, 0);
				this.changedPaddles.add(paddle);
			}
		});

		this.ball.pos.add(this.ball.speed);
		if (this.ball.collides(topWall) || this.ball.collides(bottomWall)) {
			// this.ball.pos.subtract(this.ball.speed);
			this.ball.speed.multiply(1, -1);
			// this.ball.pos.add(this.ball.speed);
			this.changedBall = true;
		}

		if (this.ball.collides(rightWall) || this.ball.collides(leftWall)) {
			// this.ball.pos.subtract(this.ball.speed);
			this.ball.speed.multiply(-1, 1);
			// this.ball.pos.add(this.ball.speed);
			this.changedBall = true;
		}
		this.io.emit("ball", this.ball);
		this.paddles.forEach(paddle => {
			const { pos, speed, size } = paddle;
			const player = this.players.find(p => p.paddle === paddle);
			this.io.emit("paddle", { pos, speed, size }, player.side);
		});

		// if (this.changedBall) {
		// 	// this.io.emit("ball", this.ball);
		// 	this.changedBall = false;
		// }

		// this.changedPaddles.forEach(paddle => {
		// 	const { pos, speed, size } = paddle;
		// 	const player = this.players.find(p => p.paddle === paddle);
		// 	this.io.emit("paddle", { pos, speed, size }, player.side);
		// 	this.changedPaddles.delete(paddle);
		// });
	}
}
