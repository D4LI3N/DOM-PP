// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { post } from '$lib/scripts/api.server.js';

export const load = async ({ locals, cookies }) => {
	console.log('LOGOUT> ' + locals.userdata);
	cookies.set('session', '', { path: '/', expires: new Date(0) });
	cookies.set('userdata', '', { path: '/', expires: new Date(0) });
	cookies.set('f_year', '', { path: '/', expires: new Date(0) });
	cookies.set('f_estate', '', { path: '/', expires: new Date(0) });
	cookies.set('f_type', '', { path: '/', expires: new Date(0) });
	cookies.set('f_month', '', { path: '/', expires: new Date(0) });
};

export const actions = {
	default: async ({ cookies, request }) => {
		console.log('LOGIN.server');
		const form_data = await request.formData();
		const form_data2 = new URLSearchParams();

		for (let pair of form_data.entries()) {
			form_data2.append(pair[0], pair[1]);
		}

		const response = await post('login', form_data2);

		if (response.ok) {
			const { token, userdata } = await response.json();
			cookies.set('session', token, {
				// send cookie for every page
				path: '/',
				// server side only cookie so you can't use `document.cookie`
				httpOnly: true,
				// only requests from same site can send cookies
				// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
				sameSite: 'strict',
				// only sent over HTTPS in production
				secure: true,
				// set cookie to expire after a month
				maxAge: 60 * 60 * 24 * 30
			});

			cookies.set('userdata', JSON.stringify(userdata), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				maxAge: 60 * 60 * 24 * 30
			});
			//s_token.set(token);
			//s_userdata.set(userdata);

			throw redirect(307, '/home');
		} else if (typeof response === 'string') {
			console.log(response);
			return { detail: response };
		} else {
			if (response.status === 401) {
				return { detail: 'Pogrešan email ili lozinka!' };
			} else {
				const { detail } = await response.json();
				console.log(detail);
				return { detail };
			}
		}
	}
};
