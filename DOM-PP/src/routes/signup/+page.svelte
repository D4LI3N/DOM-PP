<script>
	import Content from '$lib/components/main/content.svelte';
	import { Card, Button, Label, Input, Checkbox } from 'flowbite-svelte';
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	if (browser) invalidateAll();
</script>

<Content>
	<Card class="w-full max-w-md ">
		<form class="flex flex-col space-y-6" action="/">
			<h3 class="text-xl font-medium text-center text-gray-900 dark:text-white">DOM-PP Sign up</h3>
			<Label class="space-y-2">
				<span>SSN:</span>
				<Input name="oib" type="number" placeholder="XXXXXXXXXXX" min="1" max="999" required />
			</Label>

			<Button type="submit" href="/" class="w-full">Continue</Button>

			<div class="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-300">
				Condition: Must possess a signed contract.
				<a
					href="mailto:danielthe@cyberdude.com"
					class="text-primary-700 hover:underline dark:text-primary-500"
				>
					Contact us
				</a>
			</div>
		</form>
	</Card>

	<Card class="w-full max-w-md ">
		<Button href="/" class="w-full bg-primary-500 dark:bg-primary-500">Return to login</Button>
	</Card>
</Content>
