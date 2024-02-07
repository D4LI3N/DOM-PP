// @ts-nocheck
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	console.log('[*] (secure).layout.load.userdata>', Boolean(locals.userdata));
	if (!locals.userdata) {
		console.log('[*] (secure).layout.load> LOGOUT');
		throw redirect(307, '/');
	}
};
