import { Socket } from "socket.io";
import Game from "./Game";

export enum Side {
	Left = "left",
	Right = "right",
}

export default class Player {
	private socket: Socket;
	public readonly side: Side;
	private room: Game;

	constructor(socket: Socket, side: Side, room: Game) {
		this.socket = socket;
		this.side = side;
		this.room = room;
	}
}
