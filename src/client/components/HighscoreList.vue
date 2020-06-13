<template>
	<div class="highscore-list" :before-close="handleClose" :visible.sync="show">
		<button @click="handleClose" class="delete" style="float: right;">&times;</button>
		<h2>Highscores</h2>
		<ol id="highscore-list">
			<li
				v-for="(user,index) in users"
				:key="`highscore-${index}`"
			>{{user.username}} - {{user.highscore}}</li>
		</ol>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getUsers } from "@client-scripts/db";

@Component({
	components: {},
})
export default class HighscoreList extends Vue {
	@Prop() getUsers: () => void;
	@Prop() show: Boolean;
	private users: any[] = [];

	private handleClose() {
		this.$emit("update:show", false);
	}

	private async mounted() {
		this.users = await getUsers();
		this.users.sort((a, b) => b.highscore - a.highscore);
	}
}
</script>

<style lang="scss" scoped>
#highscore-list {
	margin: 1rem;
}
.delete {
	background-color: #4cafab;
	border: 1px solid rgb(59, 138, 135);
	display: inline-block;
	cursor: pointer;
	color: #ffffff;
	font-family: Arial;
	font-size: 13px;
	font-weight: bold;
	padding: 6px 12px;
	text-decoration: none;
}
</style>
