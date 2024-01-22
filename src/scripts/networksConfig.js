const networks = [
    {
        id: 1,
        chainId: 1,
        name: "ethereum",
        displayName: "Ethereum Mainnet",
        currencySymbol: "ETH",
        blockExplorer: "https://etherscan.io",
        blockExplorerIcon: "etherscan",
        rpcUrl: "https://mainnet.infura.io/v3/",
        icon: "ethereum",
        factory_address: "0x924D747B95CCdc82D4f4E15F04e69f4Eb1FB39D9",
        subgraph_url:
            "https://api.thegraph.com/subgraphs/name/gildlab/offchainassetvault-ethereum",
    },
    {
        id: 5,
        chainId: 5,
        name: "goerli",
        displayName: "Goerli Testnet",
        currencySymbol: "GoerliETH",
        blockExplorer: "https://goerli.etherscan.io",
        blockExplorerIcon: "etherscan",
        rpcUrl: "https://goerli.infura.io/v3/",
        icon: "ethereum",
        factory_address: "0x6DB9F75C0B79E0351B09311c4856F556b09F67a5",
        subgraph_url:
            "https://api.thegraph.com/subgraphs/name/gildlab/offchainassetvault-goerli",
    },
    {
        id: 137,
        chainId: 137,
        name: "polygon",
        displayName: "Polygon",
        currencySymbol: "MATIC",
        blockExplorer: "https://polygonscan.com",
        blockExplorerIcon: "polygonscan",
        rpcUrl: "https://polygon-rpc.com",
        icon: "polygon",
        factory_address: "0xFE259001e141A41f3bcCDBc315A8F0D23Ef84b0b",
        subgraph_url:
            "https://api.thegraph.com/subgraphs/name/gildlab/offchainassetvault-polygon",
    },
    {
        id: 80001,
        chainId: 80001,
        name: "mumbai",
        displayName: "Mumbai Testnet",
        currencySymbol: "MATIC",
        blockExplorer: "https://mumbai.polygonscan.com",
        blockExplorerIcon: "polygonscan",
        rpcUrl: "https://rpc-mumbai.maticvigil.com/",
        icon: "polygon",
        factory_address: "0x94927792b88D518f9a429572dD3D40400b8BE906",
        subgraph_url:
            "https://api.thegraph.com/subgraphs/name/gildlab/offchainassetvault-mumbai",
    },
    // {
    //     id: 80001,
    //     chainId: 80001,
    //     name: 'mumbai',
    //     displayName: "Mumbai testnet",
    //     currencySymbol: "MATIC",
    //     blockExplorer: "https://mumbai.polygonscan.com",
    //     rpcUrl: "https://rpc-mumbai.maticvigil.com/",
    //     icon: 'polygon',
    //     factory_address: '0x792f2567Af36fD43655f62Bf1a457e701a1f7C8d',
    //     subgraph_url: "https://api.thegraph.com/subgraphs/name/ninokeldishvili/erc20-price-oracle-vault"
    // }
];

export default networks;
