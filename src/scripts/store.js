import {writable} from 'svelte/store';
import {ROLES} from "./consts.js";

export const vault = writable({});
export const activeNetwork = writable({});
export const data = writable({});
export const roles = writable(ROLES)
export const account = writable("")
export const accountRoles = writable({})
export const tokens = writable([])
export const ethersData = writable([])
export const auditHistory = writable({})
export const fileHash = writable("")
export const fileDropped = writable({})
export const uploadBtnLoading = writable(false)
export const selectedReceipt = writable({})
export const schemas = writable([])
export const transactionInProgress = writable(false)
export const transactionError = writable(false)
export const transactionInProgressShow = writable(false)
export const transactionSuccess = writable(false)
export const transactionHash = writable("")
export const promptTopText = writable("")
export const promptBottomText = writable("")
export const promptErrorText = writable("Transaction failed")
export const promptSuccessText = writable("Transaction successful!")
export const promptNoBottom = writable(false)
export const schemaError = writable("")
export const promptCloseAction = writable(() => {})
export const deposits = writable([])
export const sftInfo = writable(false)
export const SFTCreated = writable(false)
export const tokenName = writable("")
export const breadCrumbs = writable([{path: "#", label: "Home"}])
export const navigationButtonClicked = writable(false)
export const pageTitle = writable("")
export const selectedReceiptInformations = writable([])
export const titleIcon = writable("")
export const isCypress = writable(false)
export const landing = writable(true)
export const activeToken = writable({})