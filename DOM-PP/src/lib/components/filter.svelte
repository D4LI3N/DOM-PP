<script lang="ts">
	// @ts-nocheck

	import { Select } from 'flowbite-svelte';
	import { enhance } from '$app/forms';

	let form;

	export let askEstates: { value: string; name: string }[] = [];
	export let askType: { value: string; name: string }[] = [];
	export let askMonth: boolean = true;
	export let askYear: boolean = true;

	//$: if (askType) askType = askType.filter((item) => allowedTypes.includes(item.value));

	export let selectedEstate: string | undefined;
	export let selectedType: string | undefined = false;
	export let selectedMonth: string | undefined = false;
	export let selectedYear: number | undefined;

	// if (browser) {
	// 	estates = getUserdata()['f_estates'];
	// 	selectedEstate = estates[0]['value'];
	// }

	let months = [
		{ value: '1', name: '(1) Siječanj' },
		{ value: '2', name: '(2) Veljača' },
		{ value: '3', name: '(3) Ožujak' },
		{ value: '4', name: '(4) Travanj' },
		{ value: '5', name: '(5) Svibanj' },
		{ value: '6', name: '(6) Lipanj' },
		{ value: '7', name: '(7) Srpanj' },
		{ value: '8', name: '(8) Kolovoz' },
		{ value: '9', name: '(9) Rujan' },
		{ value: '10', name: '(10) Listopad' },
		{ value: '11', name: '(11) Studeni' },
		{ value: '12', name: '(12) Prosinac' }
	];

	let years: number[] = [];

	// Populate years from 2008 to 2024
	for (let year = new Date().getFullYear(); year >= 2008; year--) {
		years.push(year);
	}

	//selectedMonth = months[0]['value'];
	//if (askType.length !== 0) selectedType = askType[0].value;
	//selectedEstate = askEstates[0].value;
	//$: if (!selectedYear) selectedYear = years[0];

	$: console.log('Filter', selectedEstate, typeof selectedEstate);
</script>

<form
	bind:this={form}
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false });
		};
	}}
	method="POST"
	class=" w-full border-y-2 md:inline-flex max-md:space-y-2 md:space-x-2 py-2 px-2 rounded-3xl bg-primary-200 dark:bg-gray-900 border-primary-500 dark:border-primary-200"
>
	<Select
		items={askEstates}
		bind:value={selectedEstate}
		on:change={() => form.requestSubmit()}
		placeholder="Nekretnina"
		class="rounded-2xl h-9 "
		size="sm"
	/>
	<input type="hidden" name="estate" value={selectedEstate} />

	{#if askType.length !== 0}
		<Select
			items={askType}
			bind:value={selectedType}
			on:change={() => form.requestSubmit()}
			placeholder="Tip uređaja"
			class="rounded-2xl h-9 "
			size="sm"
		/>
		<input type="hidden" name="type" value={selectedType} />
	{/if}

	<div class=" w-full space-x-2 inline-flex">
		{#if askMonth}
			<Select
				items={months}
				bind:value={selectedMonth}
				on:change={() => form.requestSubmit()}
				placeholder="Mjesec"
				class="rounded-2xl h-9 "
				size="sm"
			/>
			<input type="hidden" name="month" value={selectedMonth} />
		{/if}

		{#if askYear}
			<Select
				id="year"
				bind:value={selectedYear}
				on:change={() => form.requestSubmit()}
				placeholder="Godina"
				class="rounded-2xl h-9 "
				size="sm"
			>
				{#each years as year (year)}
					<option value={year}>{year}</option>
				{/each}
			</Select>
			<input type="hidden" name="year" value={selectedYear} />
		{/if}
	</div>
</form>
