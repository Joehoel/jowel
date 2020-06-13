<template>
	<form @submit.prevent="handleSubmit" id="register-form" class="form">
		<h2>Register</h2>
		<div class="form-group">
			<label for="email">Email</label>
			<input v-model="email" autofocus type="email" name="email" placeholder="Enter Email here..." />
		</div>
		<div class="form-group">
			<label for="username">Username</label>
			<input
				v-model="username"
				autocomplete="off"
				type="text"
				name="username"
				placeholder="Enter Username here..."
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
		<button type="submit">Submit</button>
	</form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
	components: {},
})
export default class Register extends Vue {
	@Prop() register: (email: string, username: string, password: string) => void;

	private email: string = "";
	private username: string = "";
	private password: string = "";

	private handleSubmit() {
		this.register(this.email, this.username, this.password);
		this.email = "";
		this.username = "";
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
