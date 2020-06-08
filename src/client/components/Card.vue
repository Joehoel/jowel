<template>
	<div class="card">
		<a :href="href">
			<img class="preview" :src="image" alt="game" />
			<h1 class="title">{{title}}</h1>
		</a>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
	components: {},
})
export default class Card extends Vue {
	@Prop() private href!: string;
	@Prop() private image!: string;
	@Prop() private title!: string;
}
</script>

<style lang="scss" scoped>
.card {
	border-radius: 2px;
	background: #efefef;
	box-shadow: 20px 20px 60px #cbcbcb, -20px -20px 60px #ffffff;
	padding: 2rem;
	/* background: linear-gradient(-45deg, rgba(128, 128, 128, 0.22), rgba(255, 255, 255, 0.25));
		box-shadow: 12px 12px 16px 0 rgba(0, 0, 0, 0.25), -8px -8px 12px 0 rgba(255, 255, 255, 0.6); */
	border-radius: 10px;
	transition: 200ms ease-in;

	&:hover {
		transform: translateY(-2%);
		background-color: #e6e6e6;
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
		width: 100%;
	}
}
</style>
