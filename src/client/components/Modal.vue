<template>
	<div class="modal">
		<form id="login-form" @submit.prevent="login(email, password)">
			<h2>Login</h2>
			<div class="form-group">
				<label for="email">Email</label>
				<input
					v-model="email"
					autocomplete="off"
					autofocus
					type="email"
					name="email"
					placeholder="Enter Email here..."
				/>
			</div>
			<div class="form-group">
				<label for="password">Password</label>
				<input
					v-model="password"
					autocomplete="off"
					autofocus
					type="password"
					name="password"
					placeholder="Enter password here..."
				/>
			</div>
			<div class="form-group">
				<p>
					Don't have an account?
					<a href="#" id="register">Register</a>
				</p>
			</div>
			<button type="submit">Submit</button>
		</form>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
	components: {},
})
export default class Modal extends Vue {
	@Prop() login: () => void;

	private email: string = "";
	private password: string = "";
}
</script>

<style lang="scss" scoped>
button {
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
.form-group {
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;

	input {
		padding: 0.5rem;
		margin-top: 5px;
	}

	button {
		margin-top: 5px;
	}
}

.modal {
	background-color: #fff;
	padding: 1rem;
	position: absolute;
	box-shadow: 0px 0px 9px 3px rgba(0, 0, 0, 0.31);
	border: 4px solid rgb(73, 73, 73);
	width: 400px;

	h2 {
		margin-bottom: 1rem;
	}

	a,
	a:visited {
		color: #4cafab;
		text-decoration: none;
	}

	button[type="submit"] {
		width: 100%;
	}
}
</style>
