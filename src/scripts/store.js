import {writable} from 'svelte/store';
import {ROLES} from "./consts.js";

export const vault = writable({});
export const activeNetwork = writable({});
export const data = writable({});
export const roles = writable(ROLES)
export const account = writable("")
export const tokens = writable([])
export const ethersData = writable([])
export const auditHistory = writable({})
export const fileHash = writable("")
export const fileDropped = writable({})
export const uploadBtnLoading = writable(false)
export const selectedReceipt = writable({})
export const schemas = writable([])
export const transactionInProgress = writable(false)
export const transactionHash = writable("")
