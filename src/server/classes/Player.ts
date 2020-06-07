import { Socket } from "socket.io";
import Game from "./Game";
import Side from "@common-enums/Side";
import Move from "@common-enums/Move";
import Paddle from "@common-classes/Paddle";

export default class Player {
	public readonly socket: Socket;
	public readonly side: Side;
	public readonly game: Game;
	public readonly paddle: Paddle;
	public move: Move;

	constructor(socket: Socket, side: Side, game: Game, paddle: Paddle) {
		this.socket = socket;
		this.side = side;
		this.game = game;
		this.move = Move.None;
		this.paddle = paddle;
	}
}
