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
            "https://api.thegraph.com/subgraphs/name/gild-lab/offchainassetvault",
        rpcUrl: "https://rpc-mumbai.maticvigil.com/",
        icon: 'polygon'
    },
    // {
    //     id: 4,
    //     chainId: 4,
    //     name: 'rinkeby',
    //     displayName: "Rinkeby Testnet",
    //     currencySymbol: "ETH",
    //     blockExplorer: "https://rinkeby.etherscan.io/",
    //     subgraphURL:
    //         "https://api.thegraph.com/subgraphs/name/ninokeldishvili/ethgsubgraph",
    //     rpcUrl: "https://rinkeby.infura.io/v3/",
    //     icon: 'ethereum'
    // }
];

export default networks;
