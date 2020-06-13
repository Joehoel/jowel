<template>
	<form id="login-form" @submit.prevent="handleSubmit" class="form">
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
				<a @click="showRegister" id="register">Register</a>
			</p>
		</div>
		<button type="submit">Submit</button>
	</form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
	components: {},
})
export default class Login extends Vue {
	@Prop() login: (email: string, password: string) => void;
	@Prop() showRegister: () => void;

	private email: string = "";
	private password: string = "";

	private handleSubmit() {
		this.login(this.email, this.password);
		this.email = "";
		this.password = "";
	}
}
</script>

<style lang="scss" scoped>
.form {
	h2 {
		margin-bottom: 1rem;
	}

	a,
	a:visited {
		cursor: pointer;
		color: #4cafab;
		text-decoration: none;
	}

	button[type="submit"] {
		width: 100%;
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
}
</style>
