const networks = [
    {
        id: 137,
        chainId: 137,
        name: 'polygon',
        displayName: "Polygon",
        currencySymbol: "MATIC",
        blockExplorer: "https://polygonscan.com/",
        rpcUrl: "https://polygon-rpc.com",
        icon: 'polygon',
        factory_address: '0x9329bf1b69a3CE69eC7694453eDC433800643B73',
        subgraph_url: "https://api.thegraph.com/subgraphs/name/gildlab/offchainassetvault-polygon"
    },
    {
        id: 80001,
        chainId: 80001,
        name: 'mumbai',
        displayName: "Mumbai Testnet",
        currencySymbol: "MATIC",
        blockExplorer: "https://mumbai.polygonscan.com/",
        rpcUrl: "https://rpc-mumbai.maticvigil.com/",
        icon: 'polygon',
        factory_address: '0x8707993CEE55bdeB8064D3883CFB17ebd81c7B1A',
        subgraph_url: "https://api.thegraph.com/subgraphs/name/gildlab/offchainassetvault-mumbai"
    },
    {
        id: 5,
        chainId: 5,
        name: 'goerli',
        displayName: "Goerli Testnet",
        currencySymbol: "GoerliETH",
        blockExplorer: "https://goerli.etherscan.io/",
        rpcUrl: "https://goerli.infura.io/v3/",
        icon: 'ethereum',
        factory_address: '0xf1A14e96977E8dE295Ba9612691D127B157d1371',
        subgraph_url: "https://api.thegraph.com/subgraphs/name/gildlab/offchainassetvault-goerli"
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
    //     icon: 'ethereum',
    //     factory_address:"0xEE95D90fCBDcFCCA629D3C56D733373C7B0121Ac",
    // }
    // {
    //     id: 3,
    //     chainId: 3,
    //     name: 'ropsten',
    //     displayName: "Ropsten Testnet",
    //     currencySymbol: "RopstenETH",
    //     blockExplorer: "https://ropsten.etherscan.io",
    //     subgraphURL:
    //         "https://api.thegraph.com/subgraphs/name/ninokeldishvili/ethgsubgraph",
    //     rpcUrl: "https://ropsten.infura.io/v3/",
    //     icon: 'ethereum',
    //     factory_address: '0x576FBc9ab2693d6e748e85B301eD0FC6b14fC708',
    //     subgraph_url: "https://api.thegraph.com/subgraphs/name/gild-lab/offchainassetvault"
    // }
];

export default networks;
