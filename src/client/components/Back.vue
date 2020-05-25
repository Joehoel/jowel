<template>
	<div class="back">
		<a :href="route">
			<i class="fa fa-arrow-left fa-2x" aria-hidden="true"></i>
		</a>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
	name: "Back",
	components: {},
})
export default class Back extends Vue {
	@Prop() public route!: string;
}
</script>

<style lang="scss">
.back {
	position: absolute;
	top: 0;
	left: 0;
	margin: 1rem;
}
</style>
