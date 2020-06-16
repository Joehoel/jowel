<template>
	<main class="center">
		<!-- <Back route="/" /> -->
		<Modal v-if="!user">
			<Login v-if="showLogin" :login="login" :showRegister="showRegister" />
			<Register v-else :register="register" />
		</Modal>
		<div class="scores">
			<h2 class="score">Score: {{ score }}</h2>
			<h2 class="highscore">Highscore: {{ highscore }}</h2>
		</div>
		<svg :width="size.x" :height="size.y" class="game" style="overflow: visible;">
			<rect x="0" y="0" :width="size.x" :height="size.y" fill="#181818" />
			<rect :x="position.x" :y="position.y" :width="scale" :height="scale" fill="#efefef" />
			<rect
				v-for="(piece, index) in tail"
				:key="`piece-${index}`"
				:x="piece.x"
				:y="piece.y"
				:width="scale"
				:height="scale"
				fill="#fff"
			/>
			<rect :x="fruit.x" :y="fruit.y" :width="scale" :height="scale" fill="#4CAFAB" />
		</svg>
		<Modal v-if="dead">
			<h3>
				You died...
				<br />press any key to try again
			</h3>
		</Modal>
		<!-- <canvas ref="canvas" width="600" height="600"></canvas> -->
		<button @click="show = true" id="highscore-button" type="button">View all highscores</button>
		<Modal v-if="show">
			<HighscoreList :show.sync="show" />
		</Modal>
		<Footer />
	</main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Footer from "@client-components/Footer.vue";
import Back from "@client-components/Back.vue";
import Modal from "@client-components/Modal.vue";
import Login from "@client-components/Login.vue";
import Register from "@client-components/Register.vue";
import HighscoreList from "@client-components/HighscoreList.vue";

import { getUsers, getHighscore, updateHighscore } from "@client-scripts/db";
import auth, { login, register } from "@client-scripts/auth";
import Vector2 from "@common-classes/Vector2";
import Grid from "@client-classes/Grid";
import { User } from "firebase";

@Component({
	components: { Back, Footer, Modal, Login, Register, HighscoreList },
})
export default class Snake extends Vue {
	private user: User = null;

	private size: Vector2 = new Vector2(600, 600);
	private scale: number = this.size.x / 15;
	// private grid: Vector2 = new Vector2(this.size.x / this.scale, this.size.y / this.scale);
	private grid: Grid = new Grid(this.scale, this.size);

	private loop: number;
	private tps: number = 10;
	private started: boolean = false;

	private showLogin: boolean = true;
	private show: boolean = false;

	private highscore: number = 0;
	private score: number = 0;
	private dead: boolean = false;

	private login = login;
	private register = register;
	private getHighscore = getHighscore;

	private position: Vector2 = new Vector2(
		(Math.floor(Math.random() * this.grid.rows - 1) + 1) * this.scale,
		(Math.floor(Math.random() * this.grid.columns - 1) + 1) * this.scale
	);
	private tail: Vector2[] = [];
	private speed: Vector2 = new Vector2();
	private fruit: Vector2 = new Vector2(
		(Math.floor(Math.random() * this.grid.rows - 1) + 1) * this.scale,
		(Math.floor(Math.random() * this.grid.columns - 1) + 1) * this.scale
	);

	private async mounted() {
		window.addEventListener("keydown", this.handleKeyDown);

		auth.onAuthStateChanged(async user => {
			if (!user) return;
			this.user = user;
			this.highscore = await getHighscore(user.uid);
			updateHighscore(this.user.uid, 41);
		});
	}

	private start() {
		this.loop = <number>(<unknown>setInterval(this.game, 1000 / this.tps));
		this.started = true;
	}

	private game() {
		for (let i = 0; i < this.tail.length - 1; i++) {
			this.tail[i] = this.tail[i + 1];
		}

		this.tail[this.score - 1] = new Vector2(this.position.x, this.position.y);

		this.position.x += this.speed.x;
		this.position.y += this.speed.y;

		if (this.position.x >= this.size.x) {
			this.position.x = 0;
		} else if (this.position.x < 0) {
			this.position.x = this.size.x - this.scale;
		} else if (this.position.y >= this.size.y) {
			this.position.y = 0;
		} else if (this.position.y < 0) {
			this.position.y = this.size.y - this.scale;
		}
		this.check();
		if (this.eat(this.fruit)) {
			this.fruit = new Vector2(
				(Math.floor(Math.random() * this.grid.rows - 1) + 1) * this.scale,
				(Math.floor(Math.random() * this.grid.columns - 1) + 1) * this.scale
			);
		}
	}

	private eat(fruit: Vector2) {
		if (this.position.x == fruit.x && this.position.y == fruit.y) {
			this.score++;
			return true;
		}

		return false;
	}

	private steer(direction: string) {
		switch (direction) {
			case "up":
				if (this.speed.y !== this.scale) {
					this.speed.x = 0;
					this.speed.y = -this.scale;
				}
				break;
			case "right":
				if (this.speed.x !== -this.scale) {
					this.speed.x = this.scale;
					this.speed.y = 0;
				}
				break;
			case "down":
				if (this.speed.y !== -this.scale) {
					this.speed.x = 0;
					this.speed.y = this.scale;
				}
				break;
			case "left":
				if (this.speed.x !== this.scale) {
					this.speed.x = -this.scale;
					this.speed.y = 0;
				}
				break;
		}
	}

	private check() {
		for (let i = 0; i < this.tail.length; i++) {
			if (this.position.x == this.tail[i].x && this.position.y == this.tail[i].y) {
				updateHighscore(this.user.uid, this.score);
				this.score = 0;
				this.tail = [];
				clearInterval(this.loop);
				this.started = false;
				this.dead = true;
			}
		}
	}

	private showRegister() {
		this.showLogin = false;
	}

	private handleKeyDown(e) {
		if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
			if (!this.started) {
				this.dead = false;
				this.start();
			}
			this.eat(this.fruit);

			const direction = e.key.replace("Arrow", "").toLowerCase();
			this.steer(direction);
		}
	}
}
</script>

<style lang="scss" scoped>
#highscore-button {
	margin-top: 1rem;
}
.scores {
	display: flex;
	justify-content: space-between;
	width: 600px;
	margin-bottom: 1rem;
}
</style>
