const networks = [
    {
        id: 1,
        chainId: 1,
        name: 'ethereum',
        displayName: "Ethereum Mainnet",
        currencySymbol: "ETH",
        blockExplorer: "https://etherscan.io",
        rpcUrl: "https://mainnet.infura.io/v3/",
        icon: 'ethereum',
        factory_address: '0x924D747B95CCdc82D4f4E15F04e69f4Eb1FB39D9',
        subgraph_url: "https://api.thegraph.com/subgraphs/name/gildlab/offchainassetvault-ethereum"
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
    {
        id: 137,
        chainId: 137,
        name: 'polygon',
        displayName: "Polygon",
        currencySymbol: "MATIC",
        blockExplorer: "https://polygonscan.com/",
        rpcUrl: "https://polygon-rpc.com",
        icon: 'polygon',
        factory_address: '0xFE259001e141A41f3bcCDBc315A8F0D23Ef84b0b',
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
        factory_address: '0xdDD6A23E4DE1A0a276d31Ea3D48d4b4BE3111829',
        subgraph_url: "https://api.thegraph.com/subgraphs/name/ninokeldishvili/erc20-price-oracle-vault"
    }
];

export default networks;
