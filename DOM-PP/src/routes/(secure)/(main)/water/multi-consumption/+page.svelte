<script>
	// @ts-nocheck
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

	let type = [
		{ value: 'hv', name: 'Vodomjeri hladne vode' },
		{ value: 'tv', name: 'Vodomjeri tople vode' }
	];
	let options = {
		chart: {
			height: '400px',
			maxWidth: '100%',
			type: 'area',
			fontFamily: 'Inter, sans-serif',
			dropShadow: {
				enabled: false
			},
			toolbar: {
				show: false
			}
		},
		tooltip: {
			enabled: true,
			x: {
				show: false
			}
		},
		fill: {
			type: 'gradient',
			gradient: {
				opacityFrom: 0.55,
				opacityTo: 0,
				shade: '#0ea5e9',
				gradientToColors: ['#0ea5e9']
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 6
		},
		grid: {
			show: true,
			strokeDashArray: 4,
			padding: {
				left: 2,
				right: 2,
				top: 0
			}
		},
		series: [
			{
				name: 'Potrošnja',
				data: [6500, 6418, 6456, 6526, 6212, 6456, 6500, 6418, 6456, 6526, 6356, 6456],
				color: '#0ea5e9'
			}
		],

		xaxis: {
			categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
			labels: {
				show: true,
				style: {
					fontFamily: 'Inter, sans-serif',
					cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
				}
			}
		},
		yaxis: {
			show: false
		}
	};
</script>

<Content>
	<div slot="head" let:class={className} class={className}>
		<Heading tag="h5" class="w-max">Consumption of all meters</Heading>
		<Filter askType={type} askMonth={false} />
	</div>

	<Card class=" h-fit max-w-5xl w-full sm:pb-0">
		<div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
			<div class="flex items-center">
				<div>
					<h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
						Diagram of consumption
					</h5>
					<p class="text-sm font-normal text-gray-500 dark:text-gray-400">
						Graphical representation of consumption
					</p>
				</div>
			</div>
		</div>

		<Chart {options} />

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

	<Card class=" w-screen-fix h-fit max-w-5xl w-full sm:pb-0">
		<div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
			<div class="flex items-center">
				<div>
					<h5 class="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
						Table of consumpton
					</h5>
					<p class="text-sm font-normal text-gray-500 dark:text-gray-400">
						Table of consumption for selected interval
					</p>
				</div>
			</div>
		</div>

		<div
			class="object-contain justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700"
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
