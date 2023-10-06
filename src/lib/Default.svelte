<script>
    import {
        activeNetwork,
        activeToken,
        account,
        vault,
        tokens,
        ethersData,
        transactionInProgressShow,
        transactionHash,
        promptTopText,
        promptBottomText,
        promptCloseAction,
        promptNoBottom,
        promptErrorText,
        promptSuccessText,
        accountRoles,
        data,
        roles,
        sftInfo,
        tokenName, breadCrumbs, navigationButtonClicked, transactionInProgress, pageTitle, isCypress
    } from "../scripts/store.js";
    import networks from "../scripts/networksConfig.js";
    import SftSetup from "../routes/SftSetup.svelte";
    import {ethers} from "ethers";
    import {onMount} from "svelte";
    import {Router, Route, navigateTo, router} from "yrv";
    import Roles from "./../routes/Roles.svelte";
    import {icons} from "../scripts/assets.js";
    import Redeem from "../routes/Redeem.svelte";
    import Mint from "../routes/Mint.svelte";
    import {
        filterArray,
        getContract,
        getSubgraphData,
        mapOrder,
        setAccountRoles,
        showPrompt
    } from "../scripts/helpers.js";
    import contractAbi from "../contract/OffchainAssetVaultAbi.json";
    import Tokens from "../routes/Tokens.svelte";
    import Members from "../routes/Members.svelte";
    import AuditHistory from "../routes/AuditHistory.svelte";
    import NewSchema from "../routes/NewSchema.svelte";
    import SftCreateSuccess from "../routes/SftCreateSuccess.svelte";
    import AssetClasses from "../routes/AssetClasses.svelte";
    import Navigation from "../components/Navigation.svelte";
    import TransactionInProgressBanner from "../components/TransactionInProgressBanner.svelte";
    import Ipfs from "../routes/Ipfs.svelte";
    import {QUERY, VAULTS_QUERY} from "../scripts/queries.js";
    import {IPFS_GETWAY, ROLES} from '../scripts/consts.js';
    import Header from '../components/Header.svelte';
    import {ROUTE_LABEL_MAP} from '../scripts/consts';
    import SFTCreateSuccessBanner from '../components/SFTCreateSuccessBanner.svelte';
    import Manual from '../routes/Manual.svelte';
    import Home from '../routes/Home.svelte';
    import AssetRegister from '../routes/AssetRegister.svelte';
    import AssetInformation from '../routes/AssetInformation.svelte';
    import TokenOverview from '../routes/TokenOverview.svelte';
    import NewRevision from '../routes/NewRevision.svelte';
    import AssetHistory from '../routes/AssetHistory.svelte';
    import ChangeComparison from '../routes/ChangeComparison.svelte';
    import AddressOverview from '../routes/AddressOverview.svelte';

    let testToken = {
        "deployer": "0xc0d477556c25c9d67e1f57245c7453da776b51cf",
        "name": "Jefo",
        "address": "0xdbcf2d8b73d06e6fa593b98857097257ebef1951",
        "symbol": "jff",
        "deployBlock": "37038452",
        "deployTimestamp": "1687183339",
        "totalShares": "41300000000000000",
        "receiptContractAddress": "0xaf2cc67c5eb4c913e1e6b0c41413d1ef65e9ce9a",
        "tokenHolders": [
            {
                "address": "0x8058ad7c22fdc8788fe4cb1dac15d6e976127324",
                "balance": "41300000000000000"
            },
            {
                "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf",
                "balance": "0"
            }
        ],
        "roleHolders": [
            {
                "role": {
                    "roleName": "WITHDRAWER",
                    "roleHash": "0x779b9d7b1cefd23059ce3e2b194efb3183a6685dd830e8cbb723b0cbeb982b28"
                },
                "account": {
                    "address": "0x8058ad7c22fdc8788fe4cb1dac15d6e976127324"
                }
            },
            {
                "role": {
                    "roleName": "CERTIFIER",
                    "roleHash": "0xd646ae07eb0d0f77457502a65e7407930dff4cd4fd99abc6aac87a753f4c8a42"
                },
                "account": {
                    "address": "0x8058ad7c22fdc8788fe4cb1dac15d6e976127324"
                }
            },
            {
                "role": {
                    "roleName": "DEPOSITOR",
                    "roleHash": "0xe16b3d8fc79140c62874442c8b523e98592b429e73c0db67686a5b378b29f336"
                },
                "account": {
                    "address": "0x8058ad7c22fdc8788fe4cb1dac15d6e976127324"
                }
            },
            {
                "role": {
                    "roleName": "DEPOSITOR",
                    "roleHash": "0xe16b3d8fc79140c62874442c8b523e98592b429e73c0db67686a5b378b29f336"
                },
                "account": {
                    "address": "0xbe14c8f33239db9699422b37f09aa86d93bb8ff6"
                }
            },
            {
                "role": {
                    "roleName": "CERTIFIER_ADMIN",
                    "roleHash": "0x4bbeb6fd3e5222e55f2f8b0c35bc228e0a06a25d0da772fdb02c3b92fa004f88"
                },
                "account": {
                    "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                }
            },
            {
                "role": {
                    "roleName": "HANDLER_ADMIN",
                    "roleHash": "0x4cbb985fecd7e86ede589f695f46f07d40afe7cb60f6049028c0b9a6bfaf649e"
                },
                "account": {
                    "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                }
            },
            {
                "role": {
                    "roleName": "DEPOSITOR_ADMIN",
                    "roleHash": "0xc091f023e1c6780346fd5f1017395079a3ea0e07d94a4f9e7273a43e3fa2a7e8"
                },
                "account": {
                    "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                }
            },
            {
                "role": {
                    "roleName": "ERC20TIERER_ADMIN",
                    "roleHash": "0xc1a04980ce16d8574a4108b9f0a95358068379059fe211b7eb60a9f805237e60"
                },
                "account": {
                    "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                }
            },
            {
                "role": {
                    "roleName": "CONFISCATOR_ADMIN",
                    "roleHash": "0xc23bede8eabca44a15d0193051ac5429f3d014a7e297a4e78f67d06657d14269"
                },
                "account": {
                    "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                }
            },
            {
                "role": {
                    "roleName": "ERC1155TIERER_ADMIN",
                    "roleHash": "0xd461edcf12d14f5a18f27560fb18cfcb7df6fedb1d46c3664b9634623e9a172d"
                },
                "account": {
                    "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                }
            },
            {
                "role": {
                    "roleName": "CERTIFIER",
                    "roleHash": "0xd646ae07eb0d0f77457502a65e7407930dff4cd4fd99abc6aac87a753f4c8a42"
                },
                "account": {
                    "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                }
            },
            {
                "role": {
                    "roleName": "ERC20SNAPSHOTTER_ADMIN",
                    "roleHash": "0xda44ae5b31a7809c0f15e7306bdde44fffb60fdee235af40c70b73a6610de41e"
                },
                "account": {
                    "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                }
            },
            {
                "role": {
                    "roleName": "DEPOSITOR",
                    "roleHash": "0xe16b3d8fc79140c62874442c8b523e98592b429e73c0db67686a5b378b29f336"
                },
                "account": {
                    "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                }
            },
            {
                "role": {
                    "roleName": "WITHDRAWER_ADMIN",
                    "roleHash": "0xf2491dcc230f29376998d72c6c3ea4cc17d3791c66e46b32ea439c19610d51db"
                },
                "account": {
                    "address": "0xc0d477556c25c9d67e1f57245c7453da776b51cf"
                }
            },
            {
                "role": {
                    "roleName": "CERTIFIER",
                    "roleHash": "0xd646ae07eb0d0f77457502a65e7407930dff4cd4fd99abc6aac87a753f4c8a42"
                },
                "account": {
                    "address": "0xc20f7e2ff49590c2b791735b30e027c8424685b6"
                }
            },
            {
                "role": {
                    "roleName": "DEPOSITOR",
                    "roleHash": "0xe16b3d8fc79140c62874442c8b523e98592b429e73c0db67686a5b378b29f336"
                },
                "account": {
                    "address": "0xc20f7e2ff49590c2b791735b30e027c8424685b6"
                }
            }
        ],
        "receiptVaultInformations": [
            {
                "information": "0xff0a89c674ee7874a40058bf789c7d8fcb0a02310c457f65c8da2f98adb8107c81820b9121b651231d53db0c8ec8fcbbad0a3e10bbbcf79c26b982e5e81d5e265813943012073d88664f35427905bdf81ccbe640465313e8d470200be50a3c536528286fd9a0526a7d10dba4a83aa3739479154557452321f735b6957865394658df719f7d8a79d4b7fc9a1e35f071977f637539983dd162f940bbcf417fcc45c68af91deb3e17fa638db12da64f2c59df87ff30c9b24a4849e39da07ddf7d3828fa6f7297de0dcbd488a7011bffa8e8a9b9cf4a3102706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d54516148537553475939783563486b3436516948547463623475733866776f48734469647673766f73467179011bff9fae3cc645f463",
                "id": "0x9d93b48841467b74fe8bd784a5cffce4e80b0ca0347f5ce9b188e894b2828e42",
                "timestamp": "1691405946"
            },
            {
                "information": "0xff0a89c674ee7874a4005841789cab56ca482cce50b2520acc0d4ef470778ff42d35364c2d8b4a49f4723329298d302908ab302d48748aca0b0f8fcc2ef2330fb5084eb6cc56aa0500215a12f7011bff8cd2927c8c86cb02706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d5361484747594d75333165765a64614a463474755834705678357061425a6e5757596b724e3755385363396b011bff9fae3cc645f463",
                "id": "0x76285361f3879b26d10259e766d6f88fc2793b71f80e06a6a28d1c101407b58e",
                "timestamp": "1689665173"
            },
            {
                "information": "0xff0a89c674ee7874a400585f789c4dcacd0d80200c06d05d7a367067069710688028d6404d0fc6dd458309b7efe75dc09298b18081c87c54a3755f94a3ac2365840904ed9cf6754022a20251d8f073cdf8541d153f98befc20248ea76d7fcb8c1b86b2e4b7dd0f24df2cf7011bffbc38eb14ad220902706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d5775354844394c6a3657675752583450736a6a50383932584459314446575973334b5041455773745650354c011bff9fae3cc645f463",
                "id": "0xfe92cfd1fd924b06ea3a66f7f2d942f7469c25eb4ee5a578c239a1d3bc5b479f",
                "timestamp": "1689665113"
            },
            {
                "information": "0xff0a89c674ee7874a400585d789c4dca4b0e80200c45d1bd746c60ce1adc8440038d620dd47460dcbbf819387bf7e51c204a2258c14116d99ab3f67b4ce0623317840114fd48ebfc43aa6a12735af071dd446a816beca64722c9bb7fb7e082a94ee5aef302be4a25a8011bffbc38eb14ad220902706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d516b5031476b534e5055483243645658395757385651536159316a79576965595039444b4152625a50437934011bff9fae3cc645f463",
                "id": "0x68df6475857cc5482c304ad8822b827a410db36f0f63afb60bd192bf1313264f",
                "timestamp": "1689662272"
            },
            {
                "information": "0xff0a89c674ee7874a4005841789cab56ca482cce50b2520acc4d8c2c2b708bacb0c82d8c34f6c80808cc35738c0a76f34d0a31ca4df52a28f40a08280fca08b2f0ca0ef00a54aa05002c041315011bff8cd2927c8c86cb02706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d61597670465978386d715933486850516d36415a53464d6254326d654a70714a505077526852384a6b504a51011bff9fae3cc645f463",
                "id": "0x1e9b346b1d17996ffb3c85ca47b5434cf1a16be9173ced7fa3956ff8dfa0e877",
                "timestamp": "1689621773"
            },
            {
                "information": "0xff0a89c674ee7874a4005853789c258b410e80200cc0feb2b3813b6ff01302cb580467606607e3dfc5786b93f6063556c50e016001c3b8f2b14f29aae708de9b992311aae892343f9bcc2349cfff40ace58a3f2b56a4beb5cf9e1727a91c85011bffbc38eb14ad220902706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d514d7451673841745a564342634668726b6b63456a517939396b4a5574514c43767a44634d4c4a5565325872011bff9fae3cc645f463",
                "id": "0xc5f39d69e5798eac9e1eacf07c1563a209689aae6176ade73f324baa2ad404db",
                "timestamp": "1688912192"
            },
            {
                "information": "0xff0a89c674ee7874a400584c789cab562a29cf2c29492d52b252ca28292928b6d2d7878ae825e7e7ea2be92895a726f964e665031500392999c5c9f94529104e7a6649466912845d929a939a5e94980be2d50200e68b1b88011bffbc38eb14ad220902706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d5273636977554a466f6d4a3967417a486a4a6e4131696d657a626f3664723131516e4478647531655a4d5446011bff9fae3cc645f463",
                "id": "0x84086f6337b97e257ab312f0e286e3de56b7cd3bf4cc2139d8dd98aaa8fb47d9",
                "timestamp": "1688911842"
            },
            {
                "information": "0xff0a89c674ee7874a4005841789cab56ca482cce50b2520acc4d2ec84ff1330b2af4cd764e8a74b7f44b35afc873cd0a09f6717575737132322bcc2e0c700971b52c48a9ca54aa050022a612da011bff8cd2927c8c86cb02706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d63706f644e3652714d6b43625947394e6537786e456a54534c45454644423236716b71504454453970647a69011bff9fae3cc645f463",
                "id": "0xf322e54fb30c2d26d420a26322200ec9991e61fde3623155ca311119b9393151",
                "timestamp": "1688643287"
            },
            {
                "information": "0xff0a89c674ee7874a4005841789cab56ca482cce50b2520acc4dce2d4ef6cb4dcf2c2e30f22937f34b29342c29cdf2a87029cb4caecc352b482d4932090eab30f3352af37651aa05004b36141f011bff8cd2927c8c86cb02706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d636d73634e6d67697370324c77364e64713174756a487844766963796d367065746234535678364d32764b44011bff9fae3cc645f463",
                "id": "0x77541dcfd5814767aa9eda5150df01637bf364ba53b3ec6f1cb66223945576a5",
                "timestamp": "1688634112"
            },
            {
                "information": "0xff0a89c674ee7874a4005841789cab56ca482cce50b2520acc4d4e4f290849354e2bac72f5718e483333b474f549cf0b0b752f7077cececc4d0e2f36344a2acdf04a4db38850aa05002af61331011bff8cd2927c8c86cb02706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d6367647054653366717a454c435866363139454c676e5655477047436b696d63577331326275684a65663858011bff9fae3cc645f463",
                "id": "0xdb9feb00cc8580c7b2da1d61635b1b2d83498e0dc7a14ed083f21f8bb2437daf",
                "timestamp": "1687337501"
            },
            {
                "information": "0xff0a89c674ee7874a4005841789cab56ca482cce50b2520acc8da84c2daff4722f0d2d362caf082a0ff3ca352e75caf4ca4c7432ce4fcb4acb32ce738f0c0c0f74318f287252aa0500437313b3011bff8cd2927c8c86cb02706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d58796577794a477555733177785277564a6d337542694a696142336f666a666a336e47595157514437587242011bff9fae3cc645f463",
                "id": "0x0b187876fa772a3fb0a930d0ca1f5840cb0f9bf24e1994329e030bf413fb7f5d",
                "timestamp": "1687201179"
            },
            {
                "information": "0xff0a89c674ee7874a4005841789cab56ca482cce50b2520accf52b49292e293049738a0c08f23349310c2e4bcccf8d2c2d4d29af3476cef2cd32754c740b73342f0874344c57aa050035f71341011bff8cd2927c8c86cb02706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d4e74647374703466425950524e3464315376616f6d59757564777933436a4d6a354161465641377051413167011bff9fae3cc645f463",
                "id": "0x22f700cf7e133fd1c0bfa4cdf54a77b639cd07d85585e06b246821a436fc13e9",
                "timestamp": "1687192860"
            },
            {
                "information": "0xff0a89c674ee7874a4005841789cab56ca482cce50b2520acc8da84c2daff4722f0d2d362caf082a0ff3ca352e75caf4ca4c7432ce4fcb4acb32ce738f0c0c0f74318f287252aa0500437313b3011bff8cd2927c8c86cb02706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d58796577794a477555733177785277564a6d337542694a696142336f666a666a336e47595157514437587242011bff9fae3cc645f463",
                "id": "0x7f5f4c82d80808a0a601e825f227d4eaa8f082ab53aae9421c21a822f062ed53",
                "timestamp": "1687184223"
            },
            {
                "information": "0xff0a89c674ee7874a4005841789cab56ca482cce50b2520accf52b49292e293049738a0c08f23349310c2e4bcccf8d2c2d4d29af3476cef2cd32754c740b73342f0874344c57aa050035f71341011bff8cd2927c8c86cb02706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d4e74647374703466425950524e3464315376616f6d59757564777933436a4d6a354161465641377051413167011bff9fae3cc645f463",
                "id": "0xc352ed3c2d33aaffa4693dc8b1bbb4d31eecea1e2871b9fbe1edad20f3f19fea",
                "timestamp": "1687183995"
            },
            {
                "information": "0xff0a89c674ee7874a4005841789cab56ca482cce50b2520accf52b49292e293049738a0c08f23349310c2e4bcccf8d2c2d4d29af3476cef2cd32754c740b73342f0874344c57aa050035f71341011bff8cd2927c8c86cb02706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d4e74647374703466425950524e3464315376616f6d59757564777933436a4d6a354161465641377051413167011bff9fae3cc645f463",
                "id": "0x8023b9a0a498ec649c0ae1c3f43eb45e03ce5eb2e2822ddccaac8bfa56619930",
                "timestamp": "1687183727"
            },
            {
                "information": "0xff0a89c674ee7874a4005841789cab56ca482cce50b2520acc8da84c2daff4722f0d2d362caf082a0ff3ca352e75caf4ca4c7432ce4fcb4acb32ce738f0c0c0f74318f287252aa0500437313b3011bff8cd2927c8c86cb02706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d58796577794a477555733177785277564a6d337542694a696142336f666a666a336e47595157514437587242011bff9fae3cc645f463",
                "id": "0xa0f855fbf34986470e0120e7b93956e9d25b4c7904753fd352f24eee970f8d4e",
                "timestamp": "1687183547"
            },
            {
                "information": "0xff0a89c674ee7874a4005841789cab56ca482cce50b2520accf52b49292e293049738a0c08f23349310c2e4bcccf8d2c2d4d29af3476cef2cd32754c740b73342f0874344c57aa050035f71341011bff8cd2927c8c86cb02706170706c69636174696f6e2f6a736f6e03676465666c617465a200782e516d4e74647374703466425950524e3464315376616f6d59757564777933436a4d6a354161465641377051413167011bff9fae3cc645f463",
                "id": "0xcb803563527b24aba1c63335c4972dfafe0a3f8c807562e6146532b5cc016a11",
                "timestamp": "1687183395"
            }
        ],
        "icon": "QmSaHGGYMu31evZdaJF4tuX4pVx5paBZnWWYkrN7U8Sc9k",
        "credentialLinks": {
            "twitter": "https://twitter.com/home",
            "webLink": "https://www.google.com/",
            "discord": "https://discord.com/",
            "github": "",
            "telegram": ""
        }
    }
    let connectedAccount;
    export let url = "";

    let isMetamaskInstalled = typeof window.ethereum !== "undefined";

    let location = window.location.hash;
    let selectedTab = "#mint";
    $: $vault.address && vaultChanged();

    async function vaultChanged() {
        if ($vault.address && $activeNetwork.id && $account) {
            await getRoles($vault.address)
            accountRoles.set(await setAccountRoles($roles, $account));
            tokenName.set($data && $data.offchainAssetReceiptVault ? $data.offchainAssetReceiptVault.name : "")
        }
    }

    router.subscribe(async e => {
        //reset pageTitle
        pageTitle.set("")


        if (!e.initial) {
            let contract = await setVault()
            location = e.path
            selectedTab = location || '#mint'
            if (!contract) {
                location = e.path
                if (location === "#list" && $tokens.length) {
                    navigateTo("#list", {replace: false})
                } else if (location === "#setup") {
                    navigateTo("#setup", {replace: false})
                } else if (location === "#ipfs") {
                    navigateTo("#ipfs", {replace: false})
                } else if (location === "#manual") {
                    navigateTo("#manual", {replace: false})
                } else if (location === `#address-overview/${e.params.address}`) {
                    navigateTo(`#address-overview/${e.params.address}`, {replace: false})
                } else if (location === `#token-overview/${e.params.address}`) {
                    navigateTo(`#token-overview/${e.params.address}`, {replace: false})
                } else if (location.includes('#asset-information')) {
                    navigateTo(location, {replace: false})
                } else {
                    vault.set({})
                    location = "#"
                    navigateTo("#", {replace: false})
                }
            }

            window.scrollTo(0, 0);
        }
    });

    export async function setVault() {
        let contractAddress = localStorage.getItem("vaultAddress");
        let contract = await getContract($activeNetwork, contractAddress, contractAbi, $ethersData.signerOrProvider);
        if (contract) {
            vault.set(contract);
        }
        return contract
    }

    onMount(async () => {
        isCypress.set(!!window.Cypress)
        await getEthersData();
        if (isCypress) {
            account.set('0xc0d477556c25c9d67e1f57245c7453da776b51cf')
            activeNetwork.set({
                "id": 80001,
                "chainId": 80001,
                "name": "mumbai",
                "displayName": "Mumbai testnet",
                "currencySymbol": "MATIC",
                "blockExplorer": "https://mumbai.polygonscan.com",
                "blockExplorerIcon": "polygonscan",
                "rpcUrl": "https://rpc-mumbai.maticvigil.com/",
                "icon": "polygon",
                "factory_address": "0x94927792b88D518f9a429572dD3D40400b8BE906",
                "subgraph_url": "https://api.thegraph.com/subgraphs/name/gildlab/offchainassetvault-mumbai"
            })
        }
        if (isMetamaskInstalled) {

            if (location === "/" || location === "") {
                navigateTo("#");
            }
            await setNetwork();

            connectedAccount = await getMetamaskConnectedAccount();
            if (connectedAccount) {
                account.set(connectedAccount)
                await vaultChanged()
                navigateTo(location || '#', {replace: false})
            } else {
                localStorage.removeItem("account");
            }

            window.ethereum.on("accountsChanged", async (accounts) => {
                if (!accounts.length) {
                    account.set(null);
                    localStorage.removeItem("account");
                } else {
                    account.set(accounts[0]);
                    localStorage.setItem("account", $account);
                    accountRoles.set(await setAccountRoles($roles, $account));

                    if ((location === '#mint' || location === '#redeem') && !$accountRoles.DEPOSITOR) {
                        navigateTo('#');
                    }
                }
            });
            window.addEventListener("hashchange", function (e) {
                // listen to browser back/forward button click event and update breadcrumbs accordingly
                let newUrl = e.newURL.split('/')[3]
                let oldURL = e.oldURL.split('/')[3]
                if (!$navigationButtonClicked) {
                    let indexOfNewUrl = $breadCrumbs.findIndex(u => u.path === newUrl)
                    let indexOfOldUrl = $breadCrumbs.findIndex(u => u.path === oldURL)
                    if (indexOfNewUrl > 0 && indexOfNewUrl < indexOfOldUrl) {
                        breadCrumbs.set($breadCrumbs.filter(p => p.path !== oldURL))
                    }

                    if (!$breadCrumbs.find(b => b.path === newUrl)) {
                        breadCrumbs.set([...$breadCrumbs, {path: newUrl, label: ROUTE_LABEL_MAP.get(newUrl)}])
                    }
                } else {
                    breadCrumbs.set([{path: "#", label: "Home"},
                        {path: newUrl, label: ROUTE_LABEL_MAP.get(newUrl)}])
                }
            })
            window.ethereum.on("chainChanged", networkChanged);
        }

        await getTokens();

        // const grantRoleTx = await $vault.connect($ethersData.signer).grantRole(await $vault.connect($ethersData.signer).DEPOSITOR(), $account.trim());
        // await grantRoleTx.wait()

    });

    async function networkChanged() {
        await showPrompt(null, {topText: "Loading, please wait", noBottomText: true})
        localStorage.setItem("vaultAddress", "");
        vault.set({});
        await setNetwork();
        await getTokens();
        navigateTo("#");
    }

    async function getEthersData() {
        if (window.ethereum) {
            let temp = {};
            temp.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            temp.signer = temp.provider.getSigner();
            temp.signerOrProvider = temp.signer ? temp.signer : temp.provider;

            ethersData.set(temp);
        }
    }

    async function setNetwork() {
        let network = await $ethersData.provider.getNetwork();
        let connectedChainId = parseInt(network.chainId);
        let temp = networks.find(
            (network) => network.chainId === connectedChainId
        );
        activeNetwork.set(temp);
        return temp;
    }

    async function handleNetworkSelect(event) {
        let activeNet = event.detail.selected;
        if ($activeNetwork && activeNet.chainId === $activeNetwork.chainId) {
            return;
        }
        let chainId = ethers.utils.hexValue(activeNet.chainId);
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{chainId}]
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: chainId,
                                chainName: activeNet.displayName,
                                rpcUrls: [activeNet.rpcUrl],
                                blockExplorerUrls: [activeNet.blockExplorer],
                                nativeCurrency: {
                                    name: activeNet.currencySymbol,
                                    symbol: activeNet.currencySymbol,
                                    decimals: 18
                                }
                            }
                        ]
                    });
                } catch (addError) {
                    // handle "add" error
                }
            }
            // handle other "switch" errors
        }
    }

    async function connect() {
        if (!isMetamaskInstalled) {
            window.open("https://metamask.io/download/", "_blank");
        } else {
            try {
                const accounts = await window.ethereum.request({
                    method: "wallet_requestPermissions",
                    params: [{
                        eth_accounts: {}
                    }]
                }).then(() => window.ethereum.request({
                    method: "eth_requestAccounts"
                }));
                account.set(accounts[0]);
                accountRoles.set(await setAccountRoles($roles, $account));
                localStorage.setItem("account", $account);
            } catch (error) {
                console.log(error);
            }
        }
        await setVault()
    }

    async function getMetamaskConnectedAccount() {
        if (isMetamaskInstalled) {
            const accounts = await $ethersData.provider.listAccounts();
            return accounts.length > 0 ? accounts[0] : null;
        }
    }

    function changeUrl(tab) {
        navigateTo(tab)
        selectedTab = tab
    }

    async function getTokens() {
        if ($isCypress) {
            tokens.set([testToken]);
            return
        }
        try {
            await getSubgraphData($activeNetwork, {}, VAULTS_QUERY, "offchainAssetReceiptVaults").then((res) => {
                if ($activeNetwork) {
                    let temp = res.data.offchainAssetReceiptVaults;
                    tokens.set(temp)
                    transactionInProgressShow.set(false)
                    transactionInProgress.set(false)
                } else {
                    tokens.set([])
                }
            });
        } catch (e) {
            console.log(e)
        }

    }

    async function getRoles(vaultAddress) {
        if (vaultAddress) {
            try {
                let variables = {id: vaultAddress.toLowerCase()}
                let res = await getSubgraphData($activeNetwork, variables, QUERY, 'offchainAssetReceiptVault')
                if (res && res.data) {
                    data.set(res.data)
                    roles.set(res.data.offchainAssetReceiptVault?.roles?.length ?
                        res.data.offchainAssetReceiptVault?.roles :
                        ROLES)
                    let rolesFiltered = $roles.map(role => {
                        let roleRevokes = $data.offchainAssetReceiptVault.roleRevokes.filter(r => r.role.roleName ===
                            role.roleName)
                        let roleRevokedAccounts = roleRevokes.map(rr => rr.roleHolder.account.address)
                        let filtered = filterArray(role.roleHolders, roleRevokedAccounts)
                        return {roleName: role.roleName, roleHolders: filtered, roleHash: role.roleHash}
                    })

                    //Order roles from subgraph as in contract
                    let rolesOrder = ROLES.map(r => r.roleHash)
                    rolesFiltered = mapOrder(rolesFiltered, rolesOrder, 'roleHash')
                    roles.set(rolesFiltered)
                }
            } catch (e) {
                console.log(e)
            }

        }
    }
</script>
<Router url={url}>

  <div class={$account || $isCypress? "content" : "content-not-connected"}>
    <Header on:select={handleNetworkSelect} {location}></Header>
    <div class="logo-container rounded-full {$account ? 'border-6' : ''}  border-white">
      <a href="/">
        {#if !$activeToken.icon}
          <img src={icons.logo} alt=""
               class="{$account ? 'bg-white' : ''} rounded-full w-full h-full"/>
        {:else}
          <img src={`${IPFS_GETWAY}${$activeToken.icon}`} alt="token logo" class="rounded-full w-full h-full"/>
        {/if}
      </a>
    </div>
    <div class="{ $account ? 'block' : 'hide'}">
      <Navigation path={location} token={$data.offchainAssetReceiptVault}/>

      <div class={$sftInfo ? "sft-info-opened" : "" }>
        <div class="{$activeNetwork  ? 'show' : 'hide'}">
          <Route path="#" component={Home}/>
          <Route path="#asset-register" component={AssetRegister}/>
          <Route path="#asset-history/:id" component={AssetHistory}/>
          <Route path="#audit-history" component={AuditHistory}/>
          <Route path="#token-overview/:address" component={TokenOverview}/>
          <Route path="#change-comparison" component={ChangeComparison}/>
          <Route path="#address-overview/:address" component={AddressOverview}/>
        </div>
      </div>
      <div class={$sftInfo ? "main-card sft-info-opened" : "main-card" }>
        <div class="{$activeNetwork  ? 'show' : 'hide'} display-flex flex-col">

          <Route path="#setup" component={SftSetup} ethersData={$ethersData}/>
          <Route path="#roles" component={Roles}/>
          <Route path="#list" component={Tokens}/>
          <Route path="#members" component={Members}/>
          <!--          <Route path="#set-vault" component={SetVault}/>-->
          <Route path="#asset-classes" component={AssetClasses}/>
          <Route path="#new-asset-class" component={NewSchema}/>
          <Route path="#asset-information/:id/:id" component={AssetInformation}/>
          <Route path="#sft-create-success" component={SftCreateSuccess}/>
          <Route path="#ipfs" component={Ipfs}/>
          <Route path="#manual" component={Manual}/>
          <Route path="#new-revision/:id" component={NewRevision}/>
          <div class={location === '#mint' || location === "#redeem" ? 'tabs show' : 'tabs hide'}>
            <div class="tab-buttons">
              <button class:selected="{selectedTab === '#mint'}" class="tab-button"
                      on:click="{() =>  changeUrl('#mint')}">
                Mint
              </button>
              <button class:selected="{selectedTab === '#redeem'}" disabled={!$accountRoles?.WITHDRAWER}
                      class="redeem-tab tab-button"
                      on:click="{() =>  changeUrl('#redeem')}">
                Redeem
              </button>
            </div>

            <div class="tab-panel-container">
              <Route path="#mint" component={Mint} ethersData={$ethersData}/>
              <Route path="#redeem" component={Redeem} ethersData={$ethersData}/>
            </div>
          </div>
        </div>
        <div class={!$activeNetwork  ? 'invalid-network show' : 'invalid-network hide'}>
          <label>Choose a supported network from the list above</label>
        </div>
      </div>
    </div>
    {#if !$account && !isCypress}
      <div>
        <div class="invalid-network f-weight-700">
          <label>To use the app:</label>
          <button class="connect-metamask-btn f-weight-700" on:click={()=>connect()}>
            {#if isMetamaskInstalled}
              <span>Connect Metamask</span>
            {/if}
            {#if !isMetamaskInstalled}
              <span>Install Metamask</span>
            {/if}
          </button>
        </div>
      </div>
    {/if}
  </div>

  <div class="footer w-full p-2 mt-5 {$account ? 'bg-white' :'' }">
    <div class="powered-by">
      <span>Powered by</span>
      <div><a href="https://www.gildlab.xyz/" target="_blank"><img src={icons.gild_lab} alt="Gild Lab"/></a></div>
      <span>and Rain</span>
      <div><a href="https://www.rainprotocol.xyz/" target="_blank"><img src={icons.rain} alt="Rain"/></a></div>
    </div>

  </div>
  {#if $transactionInProgressShow}
    <div class="blur"></div>
  {/if}
  <TransactionInProgressBanner topText={$promptTopText}
                               bottomText={$promptBottomText}
                               transactionHash={$transactionHash}
                               noBottomText={$promptNoBottom}
                               errorText={$promptErrorText}
                               successText={$promptSuccessText}
                               on:close={$promptCloseAction}/>
  <SFTCreateSuccessBanner/>
</Router>


<style lang="scss">
  .logo-container {
    z-index: 3;
    position: fixed;
    display: flex;
    top: 20px;
    left: 55px;
    background: #9D9D9D;
  }

  .logo-container img {
    height: 85px;
    width: 85px;
  }

  .border-6 {
    border-width: 6px
  }

  .container {
    display: flex;
    flex-direction: column;
  }

  .default-header {
    justify-content: space-between;
    display: flex;
    padding-left: 107px;
    width: 100%;
    padding-right: 65px;
  }

  .logo {
    cursor: pointer;
  }

  .logo-label {
    font-family: 'Mukta', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 30px;
    color: #F9DFA0;
  }

  .main-card {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 9rem;
  }

  .sft-info-opened {
    margin-left: 36rem;
  }

  .invalid-network {
    background-color: transparent;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: calc(100vh - 200px);
    font-style: normal;
    font-size: 40px;
    line-height: 66px;
    color: #FFFFFF;
  }

  .connect-metamask-btn {
    background: #2C2C54;
    border-radius: 30px;
    padding: 7px 35px;
    font-style: normal;
    font-size: 25px;
    line-height: 42px;
    color: #FFFFFF;
    cursor: pointer;
    border: none;
  }

  .select-icon {
    margin-right: 10px;
  }

  .tabs {
    display: flex;
    flex-direction: column;

  }

  .tab-buttons {
    display: flex;

  }

  .tab-button {
    margin: 0;
    color: #000000;
    width: 105px;
    height: 36px;
    background: linear-gradient(227.8deg, #FFFFFF 21.59%, #C5C4C4 61.47%);
    border-radius: 20px 10px 0 0;
    border: none;
    font-weight: 300;
    font-size: 16px;
    line-height: 27px;
  }

  .tab-panel-container {
    min-width: 600px;
    max-width: 700px;
    min-height: 535px;
    background: #FFFFFF;
    border-radius: 0 20px 20px 20px;
    padding-bottom: 20px;
  }

  .redeem-tab {
    border-radius: 10px 10px 0 0 !important;
    margin-left: 2px;
  }

  .redeem-tab:disabled {
    color: #9D9D9D;
    opacity: 0.8;
  }

  .selected {
    background: #FFFFFF;
    font-weight: 700;
  }

  .show {
    display: flex;
  }

  .hide {
    display: none;
  }

  .footer {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', sans-serif;
  }

  .powered-by {
    width: 320px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: space-between;
  }

  .content {
    height: fit-content;
    min-height: 100vh;
  }

  .content-not-connected {
    min-height: 100vh;
    height: fit-content;
    background: rgb(181, 220, 255);
    background: linear-gradient(0deg, #b5dcff 0%, #6f5ea1 100%);
    background-attachment: fixed;
  }

  .blur {
    position: fixed;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(3.5px);
    top: 0;
    z-index: 3;
  }


</style>