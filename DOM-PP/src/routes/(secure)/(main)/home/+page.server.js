// @ts-nocheck
import { get } from '$lib/scripts/api.server.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, cookies }) => {
	const token = cookies.get('session');
	console.log(cookies.get('f_estate'), locals.userdata.f_estates);

	// cookie jacker
	if (
		cookies.get('f_estate') !== undefined &&
		locals.userdata.f_estates.every((item) => item.value !== cookies.get('f_estate'))
	)
		throw redirect(307, '/');

	let f_estate = cookies.get('f_estate') ?? locals.userdata.f_estates[0]['value'];
	let f_year = cookies.get('f_year') ?? new Date().getFullYear();

	const series_home = await generateOptions(token, f_estate, f_year);

	return {
		estates: locals.userdata.f_estates,
		series_home,
		f_year: Number(f_year),
		f_estate
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const form_data = await request.formData();
		console.log('[*] home.actions <' + request.url, form_data.get('year'));

		cookies.set('f_estate', form_data.get('estate'), { path: '/' });
		cookies.set('f_year', form_data.get('year'), { path: '/' });

		return { status: 200 };
	}
};

const generateOptions = async (token, estate, year) => {
	const params = new URLSearchParams({
		estate: estate,
		year: year
	});
	console.log('diagram_home?' + params);

	const response = await get('diagram_home?' + params, token);

	if (response.ok) {
		const { points } = await response.json();

		const seriesData = {};

		points.forEach(({ type, month, total_consumption }) => {
			if (!seriesData[type]) {
				seriesData[type] = {
					name: typeColors[type].label,
					color: typeColors[type].color,
					data: Array.from({ length: 12 }, () => null) // Initialize array for each serial with 12 null values
				};
			}
			seriesData[type].data[month - 1] = total_consumption; // Fill in the consumption value at the appropriate index
		});

		// Convert object to array
		//options_template.series = Object.values(seriesData);

		//options.series[0].data = JSON.parse(points);
		//console.log(Object.values(seriesData)[0]);

		return Object.values(seriesData);
	} else if (typeof response === 'string') {
		console.log(response);
		return { detail: response };
	} else {
		if (response.status === 401) {
			//token exipred
			throw redirect(307, '/');
		} else {
			const { detail } = await response.json();
			console.log(detail);
			return { detail };
		}
	}
};

const typeColors = {
	r: { label: 'Heat - Heat Distributors', color: '#FF0000' }, // red
	k: { label: 'Heat - Calorimeters', color: '#FFA500' }, // orange
	hv: { label: 'Water - Cold Water', color: '#5dd5c9' }, // dark blue
	tv: { label: 'Water - Hot Water', color: '#00bfff' }, // cyan
	p: { label: 'Gas', color: '#FFFF00' } // yellow
};
