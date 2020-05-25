<template>
	<div>
		<p v-text="this.text"></p>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TextBox extends Vue {
	@Prop() private text!: string;
}
</script>

<style lang="scss" scoped>
div {
	height: 100%;

	display: grid;
	align-items: center;
	justify-items: center;
}
</style>
