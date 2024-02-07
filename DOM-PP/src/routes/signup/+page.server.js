// @ts-nocheck

export const load = async ({ locals, cookies }) => {
	console.log('LOGOUT> ' + locals.userdata);
	cookies.set('session', '', { path: '/', expires: new Date(0) });
	cookies.set('userdata', '', { path: '/', expires: new Date(0) });
	cookies.set('f_year', '', { path: '/', expires: new Date(0) });
	cookies.set('f_estate', '', { path: '/', expires: new Date(0) });
	cookies.set('f_type', '', { path: '/', expires: new Date(0) });
	cookies.set('f_month', '', { path: '/', expires: new Date(0) });
};
