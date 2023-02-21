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
        factory_address: '0x94927792b88D518f9a429572dD3D40400b8BE906',
        subgraph_url: "https://api.thegraph.com/subgraphs/name/gildlab/offchainassetvault-mumbai"
    }
];

export default networks;
