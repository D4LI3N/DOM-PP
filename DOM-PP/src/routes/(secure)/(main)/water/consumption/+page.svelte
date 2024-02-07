<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { chart_consumption } from '$lib/scripts/charts.js';
	import Content from '$lib/components/main/content.svelte';
	import Filter from '$lib/components/filter.svelte';
	import { ChevronRightSolid } from 'flowbite-svelte-icons';
	import {
		Heading,
		Chart,
		Card,
		A,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	export let data;

	$: chart_consumption.series = data.chart_consumption;
</script>

<Content>
	<div slot="head" let:class={className} class={className}>
		<Heading tag="h5" class="w-max">Consumption by each meter</Heading>
		<Filter
			askEstates={data.estates}
			askType={data.types}
			askMonth={false}
			selectedYear={data.f_year}
			selectedEstate={data.f_estate}
			selectedType={data.f_type}
		/>
	</div>

	<Card class=" h-fit max-w-5xl w-full sm:pb-0">
		<div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
			<div class="flex items-center">
				<div>
					<h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
						Consumption diagram
					</h5>
					<p class="text-sm font-normal text-gray-500 dark:text-gray-400">
						Graphical representation of consumption by all meters
					</p>
				</div>
			</div>
		</div>

		<Chart options={chart_consumption} />

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

	<!-- <div class="w-screen-99 max-w-max"> -->

	<Card class=" w-screen-fix h-fit max-w-5xl sm:pb-0 mx-0">
		<div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
			<div class="flex items-center">
				<div>
					<h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
						Table of expenditure
					</h5>
					<p class="text-sm font-normal text-gray-500 dark:text-gray-400">
						Table of expenditure for selected interval
					</p>
				</div>
			</div>
		</div>

		<div
			class=" object-contain justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700"
		>
			<Table shadow={true} hoverable={true}>
				<TableHead>
					<TableHeadCell>Serial number</TableHeadCell>
					<TableHeadCell>Month</TableHeadCell>
					<TableHeadCell>Impuls</TableHeadCell>
					<TableHeadCell>Value</TableHeadCell>
					<TableHeadCell>Serial number</TableHeadCell>
					<TableHeadCell>Month</TableHeadCell>
					<TableHeadCell>Impuls</TableHeadCell>
					<TableHeadCell>Value</TableHeadCell>
					<TableHeadCell>Serial number</TableHeadCell>
					<TableHeadCell>Month</TableHeadCell>
					<TableHeadCell>Impuls</TableHeadCell>
					<TableHeadCell>Value</TableHeadCell>
				</TableHead>
				<TableBody>
					<TableBodyRow>
						<TableBodyCell>12345678</TableBodyCell>
						<TableBodyCell>1</TableBodyCell>
						<TableBodyCell>2</TableBodyCell>
						<TableBodyCell>4</TableBodyCell>
						<TableBodyCell>12345678</TableBodyCell>
						<TableBodyCell>1</TableBodyCell>
						<TableBodyCell>2</TableBodyCell>
						<TableBodyCell>4</TableBodyCell>
						<TableBodyCell>12345678</TableBodyCell>
						<TableBodyCell>1</TableBodyCell>
						<TableBodyCell>2</TableBodyCell>
						<TableBodyCell>4</TableBodyCell>
					</TableBodyRow>
					<TableBodyRow>
						<TableBodyCell>87654321</TableBodyCell>
						<TableBodyCell>2</TableBodyCell>
						<TableBodyCell>6</TableBodyCell>
						<TableBodyCell>12</TableBodyCell>
						<TableBodyCell>87654321</TableBodyCell>
						<TableBodyCell>2</TableBodyCell>
						<TableBodyCell>6</TableBodyCell>
						<TableBodyCell>12</TableBodyCell>
						<TableBodyCell>87654321</TableBodyCell>
						<TableBodyCell>2</TableBodyCell>
						<TableBodyCell>6</TableBodyCell>
						<TableBodyCell>12</TableBodyCell>
					</TableBodyRow>
					<TableBodyRow>
						<TableBodyCell>12312312</TableBodyCell>
						<TableBodyCell>3</TableBodyCell>
						<TableBodyCell>14</TableBodyCell>
						<TableBodyCell>28</TableBodyCell>
						<TableBodyCell>12312312</TableBodyCell>
						<TableBodyCell>3</TableBodyCell>
						<TableBodyCell>14</TableBodyCell>
						<TableBodyCell>28</TableBodyCell>
						<TableBodyCell>12312312</TableBodyCell>
						<TableBodyCell>3</TableBodyCell>
						<TableBodyCell>14</TableBodyCell>
						<TableBodyCell>28</TableBodyCell>
					</TableBodyRow>
					<TableBodyRow>
						<TableBodyCell>12312312</TableBodyCell>
						<TableBodyCell>3</TableBodyCell>
						<TableBodyCell>14</TableBodyCell>
						<TableBodyCell>28</TableBodyCell>
						<TableBodyCell>12312312</TableBodyCell>
						<TableBodyCell>3</TableBodyCell>
						<TableBodyCell>14</TableBodyCell>
						<TableBodyCell>28</TableBodyCell>
						<TableBodyCell>12312312</TableBodyCell>
						<TableBodyCell>3</TableBodyCell>
						<TableBodyCell>14</TableBodyCell>
						<TableBodyCell>28</TableBodyCell>
					</TableBodyRow>
					<TableBodyRow>
						<TableBodyCell>12312312</TableBodyCell>
						<TableBodyCell>3</TableBodyCell>
						<TableBodyCell>14</TableBodyCell>
						<TableBodyCell>28</TableBodyCell>
						<TableBodyCell>12312312</TableBodyCell>
						<TableBodyCell>3</TableBodyCell>
						<TableBodyCell>14</TableBodyCell>
						<TableBodyCell>28</TableBodyCell>
						<TableBodyCell>12312312</TableBodyCell>
						<TableBodyCell>3</TableBodyCell>
						<TableBodyCell>14</TableBodyCell>
						<TableBodyCell>28</TableBodyCell>
					</TableBodyRow>
					<TableBodyRow>
						<TableBodyCell>12312312</TableBodyCell>
						<TableBodyCell>3</TableBodyCell>
						<TableBodyCell>14</TableBodyCell>
						<TableBodyCell>28</TableBodyCell>
						<TableBodyCell>12312312</TableBodyCell>
						<TableBodyCell>3</TableBodyCell>
						<TableBodyCell>14</TableBodyCell>
						<TableBodyCell>28</TableBodyCell>
						<TableBodyCell>12312312</TableBodyCell>
						<TableBodyCell>3</TableBodyCell>
						<TableBodyCell>14</TableBodyCell>
						<TableBodyCell>28</TableBodyCell>
					</TableBodyRow>
				</TableBody>
			</Table>
		</div>

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

	<!-- </div> -->
</Content>
