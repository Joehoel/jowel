<template>
	<main class="center">
		<svg :width="size.x" :height="size.y" class="game" style="overflow: visible;">
			<!-- <rect x="0" y="0" :width="size.x" :height="size.y" fill="#181818" /> -->
			<rect
				v-for="(row, index) in grid.rows"
				:key="index"
				:x="scale * col - scale"
				:y="scale * row - scale"
				:width="scale"
				:height="scale"
				:fill="row % 2 ? '#fff' : '#000'"
			/>
			<!-- <rect
					v-for="(col, index) in grid.columns"
					:key="index"
					:x="scale * col - scale"
					:y="0"
					:width="scale"
					:height="scale"
					:fill="col % 2 ? '#fff' : '#000'"
			/>-->
		</svg>
	</main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Vector2 from "../../common/classes/Vector2";
import Grid from "../classes/Grid";

@Component({
	components: {},
})
export default class Chess extends Vue {
	private size: Vector2 = new Vector2(600, 600);
	private scale: number = this.size.x / 8;
	private grid: Grid = new Grid(this.scale, this.size);

	private mounted() {
		console.log(this.scale);
	}
}
</script>

<style lang="scss" scoped>
</style>
