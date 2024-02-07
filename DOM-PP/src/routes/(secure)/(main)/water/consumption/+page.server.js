// @ts-nocheck
import { get } from '$lib/scripts/api.server.js';
import { redirect } from '@sveltejs/kit';

const allowed_types = ['hv', 'tv'];

export const load = async ({ locals, cookies }) => {
	const token = cookies.get('session');

	// cookie jacker
	if (
		cookies.get('f_estate') !== undefined &&
		locals.userdata.f_estates.every((item) => item.value !== cookies.get('f_estate'))
	)
		throw redirect(307, '/');

	let f_estate = cookies.get('f_estate') ?? locals.userdata.f_estates[0]['value'];
	let f_year = cookies.get('f_year') ?? new Date().getFullYear();

	let f_type =
		cookies.get('f_type') && allowed_types.includes(cookies.get('f_type'))
			? cookies.get('f_type')
			: locals.userdata.f_types.find((item) => allowed_types.includes(item.value))?.value ??
			  allowed_types[0];
	//f_type = f_type ?? locals.userdata.f_types[0]['value'];
	console.log('>>> ', f_type);
	const chart_consumption = await generateOptions(token, f_estate, f_year, f_type, allowed_types);

	return {
		estates: locals.userdata.f_estates,
		types: locals.userdata.f_types.filter((type) => allowed_types.includes(type.value)),
		chart_consumption,
		f_year: Number(f_year),
		f_estate,
		f_type
	};
};

export const actions = {
	default: async ({ request, cookies }) => {
		console.log('server>' + request.url);
		const form_data = await request.formData();

		cookies.set('f_estate', form_data.get('estate'), { path: '/' });
		cookies.set('f_year', Number(form_data.get('year')), { path: '/' });
		cookies.set('f_type', form_data.get('type'), { path: '/' });

		return { status: 200 };
	}
};

const generateOptions = async (token, estate, year, type) => {
	//console.log(token);

	const params = new URLSearchParams({
		estate: estate,
		year: year,
		type: type
	});
	console.log('diagram_monthly_readouts?' + params);

	const response = await get('diagram_monthly_readouts?' + params, token);

	if (response.ok) {
		const { points } = await response.json();

		const seriesData = {};

		points.forEach(({ serial, type, month, total_consumption }) => {
			if (!seriesData[serial]) {
				seriesData[serial] = {
					name: serial,
					color: typeColors[type].color,
					data: Array.from({ length: 12 }, () => null) // Initialize array for each serial with 12 null values
				};
			}
			seriesData[serial].data[month - 1] = total_consumption; // Fill in the consumption value at the appropriate index
		});
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
