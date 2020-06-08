<template>
	<header>
		<h1 class="title">Joël Games</h1>
	</header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
	components: {},
})
export default class Header extends Vue {}
</script>

<style lang="scss" scoped>
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
</style>
