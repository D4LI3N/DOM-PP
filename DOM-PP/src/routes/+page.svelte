<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import Content from '$lib/components/main/content.svelte';
	import { Card, Button, Label, Input, Checkbox, ButtonGroup, InputAddon } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
	import { invalidateAll } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { browser } from '$app/environment';

	export let form;
	if (browser) invalidateAll();

	let show1 = false;
	let validationColor = 'base';

	$: if (form) {
		validationColor = 'red';
	}

	// const login = async () => {
	// 	const formData = new URLSearchParams();
	// 	formData.append('username', form_username);
	// 	formData.append('password', form_password);
	// 	try {
	// 		const response = await fetch('http://127.0.0.1:8000/login', {
	// 			method: 'POST',
	// 			headers: {
	// 				accept: 'application/json',
	// 				'Content-Type': 'application/x-www-form-urlencoded'
	// 			},
	// 			body: formData
	// 		});

	// 		if (response.ok) {
	// 			const { token, username, userdata } = await response.json();
	// 			authLogin(token);
	// 			setUserdata(userdata);
	// 			//localStorage.setItem('userdata', JSON.stringify(userdata));

	// 			console.log(token, username, userdata);
	// 			goto('/home');
	// 		} else {
	// 			switch (response.status) {
	// 				case 401:
	// 					form_message = 'Pogrešan email ili lozinka!';
	// 					validationColor = 'red';
	// 					break;
	// 				case 404:
	// 					form_message = 'Nije pronađeno!';
	// 					break;
	// 				default:
	// 					const { detail } = await response.json();
	// 					form_message = 'Server: ' + detail;
	// 					break;
	// 			}
	// 		}
	// 	} catch (error) {
	// 		if (error.message === 'Failed to fetch') {
	// 			form_message = 'API nedostupan!';
	// 		} else {
	// 			form_message = error.message;
	// 		}
	// 	}
	// };
</script>

<Content>
	<Card class="w-full max-w-md  ">
		<form class="flex flex-col space-y-6" method="POST" use:enhance>
			<input type="hidden" name="option" value="login" />
			<h3 class="text-xl font-medium text-center text-gray-900 dark:text-white">DOM-PP Login</h3>
			<Label class="space-y-2">
				<span>Email</span>
				<Input
					type="email"
					name="username"
					color={validationColor}
					placeholder="my@email.com"
					required
				/>
			</Label>

			<div>
				<Label for="show-password1" class="mb-2">Lozinka</Label>
				<ButtonGroup class="w-full">
					<Input
						id="show-password1"
						name="password"
						color={validationColor}
						type={show1 ? 'text' : 'password'}
						placeholder="Password"
					/>
					<InputAddon>
						<button tabindex="-1" on:click|preventDefault={() => (show1 = !show1)}>
							{#if show1}
								<EyeOutline class="w-5 h-5" color={validationColor} />
							{:else}
								<EyeSlashOutline class="w-5 h-5" color={validationColor} />
							{/if}
						</button>
					</InputAddon>
				</ButtonGroup>
			</div>

			<div class="flex items-start">
				<Checkbox>Remember me</Checkbox>
				<a href="/" class="ms-auto text-sm text-primary-700 hover:underline dark:text-primary-500">
					Forgot password?
				</a>
			</div>

			{#if form}
				<div class="text-red-700"><b>Error: </b>{form.detail}</div>
			{/if}
			<Button type="submit" class="w-full">Login</Button>

			<div class="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
				Not registered?
				<a href="/signup" class="text-primary-700 hover:underline dark:text-primary-500">
					Sign up
				</a>
			</div>
		</form>
	</Card>
</Content>
