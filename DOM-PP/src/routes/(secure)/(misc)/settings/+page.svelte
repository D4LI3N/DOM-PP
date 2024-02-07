<script lang="ts">
	import Content from '$lib/components/main/content.svelte';
	import { page } from '$app/stores';
	import { Heading, Hr, Toggle, Button, Select, Label, Input } from 'flowbite-svelte';

	let selected: string = 'ts';

	let countries = [{ value: 'ts', name: 'TI-SAN' }];
</script>

<Content>
	<div slot="head" let:class={className} class={className}>
		<Heading tag="h5" class="w-max">Settings</Heading>
	</div>

	<form class="flex flex-col space-y-6" action="#">
		<div class="flex flex-row max-md:flex-col md:space-x-6">
			<div class="space-y-6 mt-2 mb-4">
				<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">My Settings</h3>
				<Label class="space-y-2">
					<span>Email</span>
					<Input
						type="email"
						name="email"
						placeholder="moj@email.com"
						value={$page.data.userdata['username']}
						disabled
					/>
				</Label>
				<Label class="space-y-2">
					<span>Phone</span>
					<Input
						type="text"
						name="phone"
						value={$page.data.userdata['phone']}
						placeholder="Contact phone	"
					/>
				</Label>
				<Label class="space-y-2">
					<span>Password</span>
					<Input type="password" name="password" placeholder="New password" />
					<Input type="password" name="password" placeholder="New password (confirm)" />
				</Label>
			</div>
			<div class="space-y-6 mt-2">
				<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Program Settings</h3>
				<Label class="space-y-2">
					<span></span>Theme
					<Select
						placeholder="Thme"
						class="mt-2"
						items={countries}
						bind:value={selected}
						disabled
					/>
				</Label>

				<Label class="space-y-2">
					<span>Keep header visible at all times</span>
					<Toggle class="pt-2" checked={true} />
				</Label>
			</div>
		</div>

		<Hr />
		<Label class="space-y-2">
			<span>Confirmation: Password</span>
			<Input type="password" name="password" placeholder="My current password" required />
		</Label>
		<Button type="submit" class="w-full1">Update</Button>
	</form>
</Content>
