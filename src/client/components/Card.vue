<template>
	<div class="card">
		<a :href="href">
			<div class="card-image">
				<img class="preview" :src="image" alt="game" />
			</div>
			<div class="card-content">
				<h1 class="title">{{title}}</h1>
			</div>
		</a>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import "@client-styles/main.scss";

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
	border-radius: 10px;
	transition: 200ms ease-in;

	&:hover {
		transform: translateY(-2%);
		background-color: #e6e6e6;
		cursor: pointer;
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
