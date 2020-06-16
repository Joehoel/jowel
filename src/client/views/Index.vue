<template>
	<main>
		<header>
			<h1 class="title">Joël Games</h1>
		</header>
		<section class="center">
			<div class="card-grid">
				<Card href="/pong" title="Pong" :image="pong" />
				<Card href="/snake" title="Snake" :image="temp" />
				<Card href="/chess" title="Chess" :image="temp" />
			</div>
		</section>
	</main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Card from "@client-components/Card.vue";

import pong from "@client-assets/pong.png";
import temp from "@client-assets/temp.jpg";

@Component({
	components: { Card },
})
export default class Index extends Vue {
	private temp = temp;
	private pong = pong;
}
</script>

<style lang="scss" scoped>
main {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;

	header {
		display: flex;
		width: 80vw;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		font-size: 1.6rem;
		margin-top: 1rem;
		background: #efefef;
		box-shadow: 20px 20px 60px #cbcbcb, -20px -20px 60px #ffffff;
		border-radius: 10px;
	}
	.card-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;

		height: 100%;
		width: 100vw;
		padding: 3rem 2rem;
	}
}
</style>
