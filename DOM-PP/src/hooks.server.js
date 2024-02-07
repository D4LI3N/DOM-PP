// @ts-nocheck

export const handle = async ({ request, locals, event, resolve }) => {
	//const su_token = s_token.subscribe((token) => {
	const token = event.cookies.get('session');

	console.log('[*] HOOKS.token:', token);
	if (token) {
		//const response = await get('userdata', token);
		//const userdata = await response.json();
		const userdata_cookie = event.cookies.get('userdata');
		const userdata = JSON.parse(userdata_cookie);
		//const su_userdata = s_userdata.subscribe((userdata) => {
		event.locals.userdata = userdata;
		//});
		//su_userdata();
	} else {
		event.locals.userdata = null;
	}
	//});
	//su_token();

	// load page as normal
	return await resolve(event);
};
