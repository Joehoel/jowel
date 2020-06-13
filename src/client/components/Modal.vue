<template>
	<div class="modal">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
	components: {},
})
export default class Modal extends Vue {}
</script>

<style lang="scss" scoped>
.modal {
	background-color: #fff;
	padding: 1rem;
	position: absolute;
	box-shadow: 0px 0px 9px 3px rgba(0, 0, 0, 0.31);
	border: 4px solid rgb(73, 73, 73);
	width: 400px;
}
</style>
