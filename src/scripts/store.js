import {writable} from 'svelte/store';

export const vault = writable({});
export const activeNetwork = writable({});
export const data = writable({});
export const roles = writable({})
export const account = writable("")
export const tokens = writable([])
export const ethersData = writable([])
