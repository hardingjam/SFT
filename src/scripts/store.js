import {readable, writable} from 'svelte/store';

export const vault = writable({});
export const activeNetwork = writable({});
export const data = writable({});
export const roles = writable({})
// export const roles = writable(
//     [
//         {
//             roleName: "DEPOSITOR",
//             roleHolders: ["0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324", "0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "DEPOSITOR_ADMIN", roleHolders: ["0x9891ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "WITHDRAWER", roleHolders: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "WITHDRAWER_ADMIN", roleHolders: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "CERTIFIER", roleHolders: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "CERTIFIER_ADMIN", roleHolders: ["0x9891ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "HANDLER", roleHolders: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "HANDLER_ADMIN", roleHolders: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "ERC20TIERER",
//             roleHolders: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324", "0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "ERC20TIERER_ADMIN", roleHolders: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "ERC1155TIERER", roleHolders: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "ERC1155TIERER_ADMIN", roleHolders: ["0x9891ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "ERC20SNAPSHOTTER",
//             roleHolders: ["0x9891ad7C22fdC8788fe4cB1dAc15D6e976127324", "0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "ERC20SNAPSHOTTER_ADMIN", roleHolders: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "CONFISCATOR",
//             roleHolders: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324", "0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//         {
//             roleName: "CONFISCATOR_ADMIN",
//             roleHolders: ["0x8058ad7C22fdC8788fe4cB1dAc15D6e976127324", "0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324", "0x9999ad7C22fdC8788fe4cB1dAc15D6e976127324"]
//         },
//     ]);
