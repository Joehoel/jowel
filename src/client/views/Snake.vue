<template>
	<main>
		<Back route="/" />
		<canvas width="600" height="600"></canvas>
		<Footer />
	</main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Footer from "@client-components/Footer.vue";
import Back from "@client-components/Back.vue";

@Component({
	components: { Back, Footer },
})
export default class Snake extends Vue {}
</script>

<style lang="scss" scoped>
</style>

