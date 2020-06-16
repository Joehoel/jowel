<template>
	<main class="center">
		<svg :width="grid.size.x" :height="grid.size.y" class="game" style="overflow: visible;">
			<rect
				v-for="(_, n) in 64"
				:key="n"
				:x="(n % 8) * grid.scale"
				:y="Math.floor(n / 8) * grid.scale"
				:width="grid.scale"
				:height="grid.scale"
				:fill="(n + Math.floor(n / 8)) % 2 ? `white` : `black`"
			/>
		</svg>
	</main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Vector2 from "@common-classes/Vector2";
import Grid from "@client-classes/Grid";

@Component({
	components: {},
})
export default class Chess extends Vue {
	private size: Vector2 = new Vector2(600, 600);
	private scale: number = this.size.x / 8;
	private grid: Grid = new Grid(this.scale, this.size);

	private mounted() {}
}
</script>

<style lang="scss" scoped>
</style>
