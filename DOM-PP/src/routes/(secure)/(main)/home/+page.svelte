<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import Content from '$lib/components/main/content.svelte';
	import Filter from '$lib/components/filter.svelte';
	import { chart_home, pie_chart_home } from '$lib/scripts/charts.js';
	import { Heading, Chart, Card, Button, A, Popover, Select } from 'flowbite-svelte';
	import {
		InfoCircleSolid,
		ChevronDownSolid,
		ChevronRightSolid,
		ArrowRightOutline
	} from 'flowbite-svelte-icons';

	let vCard = false;
	let isOpen = false;

	export let data;

	$: chart_home.series = data.series_home;
</script>

<Content>
	<div slot="head" let:class={className} class={className}>
		<Heading tag="h5" class="w-max">Home</Heading>
		<Filter
			askEstates={data.estates}
			askMonth={false}
			selectedYear={data.f_year}
			selectedEstate={data.f_estate}
		/>
	</div>

	<!-- flex-shrink-0 flex-grow-0 space-y-0 mx-2 my-2 -->
	<Card class=" h-fit sm:pb-0">
		<div class="flex justify-between items-start w-full">
			<div class="flex-col items-center">
				<div class="flex items-center mb-3">
					<h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">
						Average monthly consumption
					</h5>

					<Popover
						triggeredBy="#donut1"
						class="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-10"
					>
						<div class="p-3 space-y-2">
							<h3 class="font-semibold text-gray-900 dark:text-white">Consumption</h3>
							<p>Consumption comparison between all meters.</p>
							<h3 class="font-semibold text-gray-900 dark:text-white">Formula</h3>
							<p>2+2=4-1=3</p>
							<A href="/">More <ChevronRightSolid class="w-2 h-2 ms-1.5" /></A>
						</div>
					</Popover>
				</div>
			</div>
			<InfoCircleSolid
				id="donut1"
				class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
			/>
			<!-- <div class="flex justify-end items-center">
			<ArrowDownToBraketSolid class="w-3.5 h-3.5" />
			<Tooltip></Tooltip>
		</div> -->
		</div>

		<div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
			<div class="grid grid-cols-3 gap-3 mb-2">
				<dl
					class="bg-orange-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px] px-1"
				>
					<dt
						class="w-8 h-8 rounded-full bg-orange-100 dark:bg-gray-500 text-red-600 dark:text-red-400 text-sm font-medium flex items-center justify-center mb-1"
					>
						12
					</dt>
					<dd class="text-red-600 dark:text-red-400 text-xs font-medium">Heat ⁽ᵏᵂʰ⁾</dd>
				</dl>
				<dl
					class="bg-teal-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px] px-1"
				>
					<dt
						class="w-8 h-8 rounded-full bg-teal-100 dark:bg-gray-500 text-yellow-500 dark:text-yellow-400 text-sm font-medium flex items-center justify-center mb-1"
					>
						23
					</dt>
					<dd class="text-yellow-500 dark:text-yellow-400 text-xs font-medium">Gas ⁽ᵏᴶ⁾</dd>
				</dl>
				<dl
					class="bg-blue-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px] px-1"
				>
					<dt
						class="w-8 h-8 rounded-full bg-blue-100 dark:bg-gray-500 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center justify-center mb-1"
					>
						64
					</dt>
					<dd class="text-blue-600 dark:text-blue-400 text-xs font-medium">Water ⁽ᵐ³⁾</dd>
				</dl>
			</div>
			<button
				on:click={() => (isOpen = !isOpen)}
				type="button"
				class="hover:underline text-xs text-gray-500 dark:text-gray-400 font-medium inline-flex items-center"
				>Show more details <ChevronDownSolid class="w-2 h-2 ms-1" />
			</button>
			{#if isOpen}
				<div
					id="more-details"
					class="border-gray-200 border-t dark:border-gray-600 pt-3 mt-3 space-y-2"
				>
					<dl class="flex items-center justify-between">
						<dt class="text-gray-500 dark:text-gray-400 text-sm font-normal">
							Previous month delta:
						</dt>
						<dd
							class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300"
						>
							<svg
								class="w-2.5 h-2.5 me-1.5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 10 14"
							>
								<path
									stroke="currentColor"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13V1m0 0L1 5m4-4 4 4"
								/>
							</svg> 57%
						</dd>
					</dl>
					<dl class="flex items-center justify-between">
						<dt class="text-gray-500 dark:text-gray-400 text-sm font-normal">Next readout in:</dt>
						<dd
							class="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-gray-600 dark:text-gray-300"
						>
							13 days
						</dd>
					</dl>
				</div>
			{/if}
		</div>

		<Chart options={pie_chart_home} class="py-6 " />

		<div class=" border-gray-200 border-t dark:border-gray-700">
			<div class="text-center my-1">
				<tr />
				<A
					href="/"
					class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline"
				>
					More details
					<ChevronRightSolid class="w-2.5 h-2.5 ms-1.5" />
				</A>
			</div>
		</div>
	</Card>

	<Card class=" h-fit max-w-2xl w-full sm:pb-0">
		<div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
			<div class="flex items-center">
				<div>
					<h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
						Monthly consumption sum
					</h5>
					<p class="text-sm font-normal text-gray-500 dark:text-gray-400">
						Monthly consumption sum of all meters
					</p>
				</div>
			</div>
		</div>

		<Chart options={chart_home} />

		<div
			class="text-center mb-0 my-1 border-gray-200 border-t dark:border-gray-700 justify-between py-1"
		>
			<A
				href="/"
				class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline"
			>
				More details
				<ChevronRightSolid class="w-2.5 h-2.5 ms-1.5" />
			</A>
		</div>
	</Card>

	<Card img="heating-949081_1280.jpg" reverse={vCard} class=" h-fit">
		<h5 class=" mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Tips for saving energy
		</h5>
		<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
			Learn how to maximize savings with the help of our devices and thereby increase energy
			efficiency of your residential building.
		</p>
		<Button href="https://www.ti-san.hr/" class="mt-14">
			More info <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
		</Button>
	</Card>
</Content>
