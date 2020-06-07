<template>
	<main>
		<nav>
			<h1 class="title">Joël Games</h1>
		</nav>
		<section>
			<div class="card-grid">
				<div class="card">
					<a href="/pong">
						<img class="preview" :src="temp" alt="temp" />
						<h1 class="title">Pong</h1>
					</a>
				</div>
				<div class="card">
					<a href="/snake">
						<img class="preview" :src="temp" alt="temp" />
						<h1 class="title">Snake</h1>
					</a>
				</div>
				<div class="card">
					<a href="/snake">
						<img class="preview" :src="temp" alt="temp" />
						<h1 class="title">Snake</h1>
					</a>
				</div>
				<div class="card">
					<a href="/snake">
						<img class="preview" :src="temp" alt="temp" />
						<h1 class="title">Snake</h1>
					</a>
				</div>
				<div class="card">
					<a href="/snake">
						<img class="preview" :src="temp" alt="temp" />
						<h1 class="title">Snake</h1>
					</a>
				</div>
				<div class="card">
					<a href="/snake">
						<img class="preview" :src="temp" alt="temp" />
						<h1 class="title">Snake</h1>
					</a>
				</div>
				<div class="card">
					<a href="/snake">
						<img class="preview" :src="temp" alt="temp" />
						<h1 class="title">Snake</h1>
					</a>
				</div>
			</div>
		</section>
	</main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import socket from "@client-scripts/socket";
import temp from "@client-assets/temp.jpg";

@Component({
	components: {},
})
export default class Index extends Vue {
	private temp = temp;
	mounted() {
		socket.on("message", console.log);
		socket.on("start", console.log);
	}
}
</script>

<style lang="scss" scoped>
main {
	display: flex;
	align-items: center;
	margin-top: 1rem;
	flex-direction: column;
}

nav {
	display: flex;
	width: 80vw;
	justify-content: center;
	align-items: center;
	padding: 1rem;
	font-size: 1.6rem;
	background: linear-gradient(-45deg, rgba(128, 128, 128, 0.22), rgba(255, 255, 255, 0.25));
	box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25), -8px -8px 12px 0 rgba(255, 255, 255, 0.3);
	border-radius: 50px;
}

.card-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;

	height: 100%;
	width: 100vw;
	padding: 3rem 2rem;

	.card {
		padding: 2rem;
		background: linear-gradient(-45deg, rgba(128, 128, 128, 0.22), rgba(255, 255, 255, 0.25));
		box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25), -8px -8px 12px 0 rgba(255, 255, 255, 0.6);
		border-radius: 50px;
		transition: 300ms ease-in-out;

		&:hover {
			transform: translateY(-1%);
			/* background: rgb(233, 233, 233); */
		}

		a {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.title {
				margin-top: 1rem;
				font-size: 2rem;
			}
		}

		.preview {
			border-radius: 50px;
			width: 100%;
		}
	}
}
</style>
