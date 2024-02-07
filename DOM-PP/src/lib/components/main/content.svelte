<script>
	// import { page } from '$app/stores';
	// $: activeUrl = $page.url.pathname;
	// $: activeUrl1 = activeUrl.split('/', 2)[1];
</script>

<!-- {#if ['home', 'heat', 'gas', 'water', 'settings', 'notifications'].includes(activeUrl1)} -->

<slot name="head" class="mx-5 items-center flex flex-wrap flex-col justify-center gap-3 pb-2" />
<div class="items-center grow flex flex-wrap flex-row justify-center my-2 mx-2 gap-3">
	<slot />
</div>
<!-- {:else}
	<div
		class=" items-center grow flex flex-wrap flex-row justify-center my-2 mx-2 gap-3
"
	>
		<slot />
	</div>
{/if} -->
