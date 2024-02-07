// @ts-nocheck
import { writable } from 'svelte/store';

const base = 'http://127.0.0.1:8000';

export const s_token = writable(null);
export const s_userdata = writable(null);

async function send({ method, path, data, token }) {
	const opts = { method, headers: {} };

	if (data) {
		opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		opts.body = data;
	}

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token}`;
	}

	try {
		const res = await fetch(`${base}/${path}`, opts);
		return res;
	} catch (error) {
		if (error instanceof TypeError && error.message.includes('fetch failed')) {
			return 'API nije dostupan!';
		} else {
			return error.message;
		}
	}
}

export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function del(path, token) {
	return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
	return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
}
