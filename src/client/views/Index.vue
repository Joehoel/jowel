<template>
	<main>
		<Header />
		<section>
			<div class="card-grid">
				<Card href="/pong" title="Pong" :image="pong" />
				<Card href="/snake" title="Snake" :image="temp" />
			</div>
		</section>
	</main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Card from "@client-components/Card.vue";
import Header from "@client-components/Header.vue";

import pong from "@client-assets/pong.png";
import temp from "@client-assets/temp.jpg";

@Component({
	components: { Card, Header },
})
export default class Index extends Vue {
	private temp = temp;
	private pong = pong;
}
</script>

<style lang="scss" scoped>
main {
	display: flex;
	align-items: center;
	flex-direction: column;
}

.card-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 2rem;

	height: 100%;
	width: 100vw;
	padding: 3rem 2rem;
}
</style>
