<script lang="ts">
	// @ts-nocheck
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider,
		DarkMode
	} from 'flowbite-svelte';

	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import FaFire from 'svelte-icons/fa/FaFire.svelte';
	import FaGripfire from 'svelte-icons/fa/FaGripfire.svelte';
	import GiWaterDrop from 'svelte-icons/gi/GiWaterDrop.svelte';
	import FaHome from 'svelte-icons/fa/FaHome.svelte';
	import GiAbstract045 from 'svelte-icons/gi/GiAbstract045.svelte';
	import IoIosNotifications from 'svelte-icons/io/IoIosNotifications.svelte';
	import IoMdSettings from 'svelte-icons/io/IoMdSettings.svelte';
	import IoMdExit from 'svelte-icons/io/IoMdExit.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	async function authLogout() {
		goto('/');
	}

	$: activeUrl = $page.url.pathname;
	$: activeUrl1 = activeUrl.split('/', 2)[1];
	//$: console.log(activeUrl1);

	let navbarGas = '';
	let navbarHeat = '';
	let navbarWater = '';

	$: if (browser) {
		console.log(activeUrl1);

		switch (activeUrl1) {
			case 'water': {
				navbarHeat = '';
				navbarWater = 'md:text-primary-700 md:dark:text-white';
				navbarGas = '';
				break;
			}
			case 'gas': {
				navbarHeat = '';
				navbarWater = '';
				navbarGas = 'md:text-primary-700 md:dark:text-white';
				break;
			}
			case 'heat': {
				navbarHeat = 'md:text-primary-700 md:dark:text-white';
				navbarWater = '';
				navbarGas = '';
				break;
			}
			default: {
				navbarHeat = '';
				navbarWater = '';
				navbarGas = '';
				break;
			}
		}
	}
</script>

{#if $page.data.userdata}
	<div class="md:h-20 sm:h-20 h-20" />
	<Navbar
		color="primary"
		fluid={true}
		class=" z-20 fixed top-0 bg-primary-200 dark:bg-gray-900 border-b rounded-b-3xl border-primary-500 dark:border-primary-200"
	>
		<!-- logo -->
		<NavBrand href="/home">
			<div class="icon-logo">
				<GiAbstract045 />
			</div>
			<span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
				>DOM-PP</span
			>
		</NavBrand>

		<!-- 3 icons -->
		<div class="flex items-center md:order-2">
			<DarkMode
				btnClass="mr-3 cursor-pointer  text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-xl p-2"
			/>
			<Avatar
				id="avatar-menu"
				class="cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 "
				border={true}
				size="sm">{$page.data.userdata['initials']}</Avatar
			>
			<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
		</div>

		<!-- Avatar options -->
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm"> {$page.data.userdata['name']}</span>
				<span class="block truncate text-sm font-medium">{$page.data.userdata['username']}</span>
			</DropdownHeader>

			<DropdownItem href="/notifications" class=" flex items-center">
				<div class="icon">
					<IoIosNotifications />
				</div>
				Notificatins</DropdownItem
			>
			<DropdownItem href="/settings" class=" flex items-center">
				<div class="icon">
					<IoMdSettings />
				</div>
				Settings</DropdownItem
			>
			<DropdownDivider />
			<DropdownItem on:click={authLogout} class=" flex items-center">
				<div class="icon">
					<IoMdExit />
				</div>
				Log out</DropdownItem
			>
		</Dropdown>

		<NavUl
			{activeUrl}
			ulClass="flex flex-col p-4 mt-4 md:flex-row md:space-x-4 md:mt-0 md:text-sm md:font-medium rounded-2xl"
		>
			<NavLi href="/home" class="cursor-pointer flex items-center md:order-2 ">
				<div class="icon">
					<FaHome />
				</div>
				Home
			</NavLi>

			<NavLi class="cursor-pointer flex items-center md:order-2 {navbarHeat}">
				<div class="icon">
					<FaFire />
				</div>
				Heat<ChevronDownOutline class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline " />
			</NavLi>
			<Dropdown class="w-44 z-20">
				<DropdownItem href="/heat/consumption">Expenditure by type</DropdownItem>
				<DropdownItem>Readouts (coming soon)</DropdownItem>
				<!-- <DropdownDivider /> -->
			</Dropdown>

			<NavLi id="navbarGas" class="cursor-pointer flex items-center md:order-2 {navbarGas}">
				<div class="icon">
					<FaGripfire />
				</div>
				Gas<ChevronDownOutline class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline " />
			</NavLi>
			<Dropdown class="w-44 z-20">
				<DropdownItem href="/gas/consumption">Expenditure by type</DropdownItem>
				<DropdownItem>Readouts (coming soon)</DropdownItem>
				<!-- <DropdownDivider /> -->
			</Dropdown>

			<NavLi id="navbarWater" class="cursor-pointer flex items-center md:order-2 {navbarWater}">
				<div class="icon">
					<GiWaterDrop />
				</div>
				Water<ChevronDownOutline class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline" />
			</NavLi>
			<Dropdown class="w-44 z-20">
				<DropdownItem href="/water/consumption">Expenditure by type</DropdownItem>
				<DropdownItem>Readouts (coming soon)</DropdownItem>
				<DropdownDivider />
				<DropdownItem>Sum of expenditure (coming soon)</DropdownItem>
			</Dropdown>
		</NavUl>
	</Navbar>
{:else}
	<div class="my-8 bg-black" />
	<div
		class="fixed rounded-b-3xl z-20 top-0 start-0 border-b flex items-center justify-center text-primary-800 dark:text-primary-400 border-primary-500 dark:border-primary-200 divide-primary-500 dark:divide-primary-200 px-2 sm:px-4 py-3 w-full bg-primary-200 dark:bg-gray-900"
	>
		<div class="w-full" />
		<NavBrand href="/">
			<div class="icon-logo">
				<GiAbstract045 />
			</div>
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">DOM-PP</span
			>
		</NavBrand>
		<div class="w-full grid justify-items-end">
			<DarkMode
				btnClass="mr-3 cursor-pointer justify-self-end text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-xl p-2"
			/>
		</div>
	</div>
{/if}
