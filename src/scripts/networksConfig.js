const networks = [
    // {
    //     id: 137,
    //     chainId: 137,
    //     name: 'polygon',
    //     displayName: "Polygon",
    //     currencySymbol: "MATIC",
    //     scanURL: "https://polygonscan.com/",
    //     subgraphURL:
    //         "https://api.thegraph.com/subgraphs/name/ninokeldishvili/erc20-price-oracle-vault",
    //     erc20PriceOracleVaultAddress: "0x69930337839d5278E7fDEBb1529d9b32357419Bc",
    //     erc20PriceOracleVaultFactoryAddress: "0xd28756A63D6F6E558dF66135191D483E84fe236E",
    //     twoPriceOracleAddress: "0x52bc9566e47bbB4b938B7B9a8D4153462d8C4D8a",
    //     rpcUrl: "https://polygon-rpc.com",
    //     erc20ContractAddress: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    // icon: 'polygon'
// },
    {
        id: 80001,
        chainId: 80001,
        name: 'mumbai',
        displayName: "Mumbai Testnet",
        currencySymbol: "MATIC",
        blockExplorer: "https://mumbai.polygonscan.com/",
        subgraphURL:
            "https://api.thegraph.com/subgraphs/name/ninokeldishvili/ethgsubgraph",
        rpcUrl: "https://rpc-mumbai.maticvigil.com/",
        icon: 'polygon'
    },
    {
        id: 4,
        chainId: 4,
        name: 'rinkeby',
        displayName: "Rinkeby Testnet",
        currencySymbol: "ETH",
        scanURL: "https://rinkeby.etherscan.io/",
        subgraphURL:
            "https://api.thegraph.com/subgraphs/name/ninokeldishvili/ethgsubgraph",
        erc20PriceOracleVaultAddress: "0xC0485b77f873147B8C9f86F3CC0543021d4e769B",
        erc20PriceOracleVaultFactoryAddress: "0x9505354B621fac407968821CcCc819C81Ae0bc26",
        twoPriceOracleAddress: "0x6Bc5906f69883DAc8C58296282BcAB26e780fc4D",
        rpcUrl: "https://rinkeby.infura.io/v3/",
        erc20ContractAddress: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
        icon: 'ethereum'
    }
];

export default networks;
