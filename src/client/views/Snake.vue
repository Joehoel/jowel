<template>
	<main class="center">
		<!-- <Back route="/" /> -->
		<Modal v-if="!currentUser" :login="login" />
		<div class="scores">
			<h2 class="score">Score: {{ score }}</h2>
			<h2 class="highscore">Highscore: {{ highscore }}</h2>
		</div>
		<canvas width="600" height="600"></canvas>
		<Footer />
	</main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@client-components/Footer.vue";
import Back from "@client-components/Back.vue";
import Modal from "@client-components/Modal.vue";

import { getUsers, getHighscore } from "@client-scripts/db";
import auth, { login } from "@client-scripts/auth";
import { User } from "firebase";

@Component({
	components: { Back, Footer, Modal },
})
export default class Snake extends Vue {
	private users: any[];
	private currentUser: User = null;
	private highscore: number = 0;
	private score: number = 0;
	private login = login;

	private async mounted() {
		auth.onAuthStateChanged(async user => {
			this.currentUser = user;
			if (!this.currentUser) return;
			// this.users = await getUsers();
			// Get highscore from database
			this.highscore = await getHighscore(this.currentUser.uid);
		});
	}
}
</script>

<style lang="scss" scoped>
.scores {
	display: flex;
	justify-content: space-between;
	width: 600px;
	margin-bottom: 1rem;
}
</style>

