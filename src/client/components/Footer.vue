<template>
	<div class="footer">
		<span>Made by: Joël Kuijper</span>

		<div class="inner">
			<a class="icon github" target="_blank" href="https://github.com/Joehoel">
				<i class="fa fa-github fa-2x"></i>
			</a>
			<a class="icon instagram" target="_blank" href="https://www.instagram.com/joel.kuijper/">
				<i class="fa fa-instagram fa-2x"></i>
			</a>
			<a class="icon twitter" target="_blank" href="https://twitter.com/joel_kuijper">
				<i class="fa fa-twitter fa-2x"></i>
			</a>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
	name: "Footer",
	components: {},
})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
.footer {
	bottom: 0;
	position: absolute;
	margin-bottom: 2rem;
	font-size: 1rem;

	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	flex-direction: column;

	.inner {
		margin-top: 1rem;

		.icon {
			margin: 0 0.25rem;
		}
	}
}
</style>
