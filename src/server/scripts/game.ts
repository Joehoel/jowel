import { Server } from "http";
import socketio, { Server as IOServer } from "socket.io";
import Game from "@server-classes/Game";
import Player from "@server-classes/Player";

const rooms: Game[] = [];

export default (server: Server) => {
	const io: IOServer = socketio(server);

	io.on("connection", socket => {
		let room: Game;
		let player: Player;

		const index = rooms.findIndex(room => room.players.length < 2);

		if (rooms.length === 0 || index === -1) {
			// console.log(rooms.length);
			// console.log(index);
			room = new Game(`room-${rooms.length}`, io);

			rooms.push(room);
			// console.log({ rooms });
		} else {
			room = rooms[index];
		}

		room.addPlayer(socket);

		if (room.players.length == 2) {
			room.startGame();
		}
		// console.log(player);
		// room.players.push(player);

		socket.on("disconnect", () => {
			const index = room.players.indexOf(player);
			room.players.splice(index, 1);
			if (room.players.length === 0) {
				rooms.splice(rooms.indexOf(room), 1);
			}
		});
		socket.emit("message", `${socket.id} joined ${room.name}`);
	});
	return io;
};
