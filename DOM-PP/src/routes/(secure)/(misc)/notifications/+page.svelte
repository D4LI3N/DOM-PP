<script lang="ts">
	import Content from '$lib/components/main/content.svelte';
	import { Heading, Hr, P, A } from 'flowbite-svelte';
</script>

<Content>
	<div slot="head" let:class={className} class={className}>
		<Heading tag="h5" class="w-max">Notifications</Heading>
	</div>

	<div>
		<Hr />
		<Heading tag="h6" class="text-center">You don't have any notifications</Heading>
		<P class="text-center"
			>If you have any questions you can contact us via <A href="mailto:danielthe@cyberdude.com"
				>danitelthe@cyberdude.com</A
			>
			or you can call: <A href="tel:+12123123123">+1231231231</A>.
		</P>
		<Hr />
	</div>
</Content>
