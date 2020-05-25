<template>
	<div>
		<a href="/pong">Pong</a>
		<a href="/snake">Snake</a>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import socket from "@client-scripts/socket";

@Component({
	components: {},
})
export default class Index extends Vue {
	mounted() {
		socket.on("message", console.log);
		socket.on("start", console.log);
	}
}
</script>

<style lang="scss" scoped></style>
