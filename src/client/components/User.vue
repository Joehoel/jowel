<template>
	<div>
		<slot name="user" :user="user"></slot>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth } from "@client-scripts/firebase";
import { ref } from "@vue/composition-api";

@Component({
	components: {},
})
export default class User extends Vue {
	public user = ref(null);
	public unsubscribe = auth.onAuthStateChanged(firebaseUser => (this.user.value = firebaseUser));

	setup() {
		// const unsubscribe = auth.onAuthStateChanged(firebaseUser => (user.value = firebaseUser));
		// this.unsubscribe = unsubscribe;
	}

	destroyed() {
		this.unsubscribe();
	}
}
</script>

<style lang="scss" scoped>
</style>
