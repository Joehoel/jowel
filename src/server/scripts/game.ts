import { Server } from "http";
import socketio, { Server as IOServer } from "socket.io";
import Game from "@server-classes/Game";
import Player from "@server-classes/Player";

const games: Game[] = [];

export default (server: Server) => {
	const io: IOServer = socketio(server);

	io.on("connection", socket => {
		socket.on("message", console.log);

		let game: Game;
		let player: Player;

		const index = games.findIndex(game => game.players.length < 2);

		if (index === -1) {
			// console.log(rooms.length);
			// console.log(index);
			game = new Game(`game-${games.length}`, io);

			games.push(game);
			// console.log({ rooms });
		} else {
			game = games[index];
		}

		socket.on("ping", () => {
			console.log("pinging");
			socket.emit("pong");
		});

		game.addPlayer(socket);

		if (game.players.length == 2) {
			game.startGame();
		}
		// console.log(player);
		// room.players.push(player);

		socket.on("disconnect", () => {
			game.removePlayer(socket);
			if (game.isEmpty) {
				games.splice(games.indexOf(game), 1);
			}
		});
		socket.send(`${socket.id} joined ${game.name}`);
		console.log(games.map(g => g.players.length));
	});
	return io;
};
