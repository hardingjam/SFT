<script>
    import Select from "../components/Select.svelte";
    import networks from "../scripts/networksConfig.js";
    import SftSetup from "../components/SftSetup.svelte";
    import {ethers} from "ethers";
    import {onMount} from 'svelte';
    import {Router, Route} from "svelte-routing"
    import Admin from "./../routes/Admin.svelte";
    import logo from '../../public/SFT.svg';
    import {activeNetwork} from "../scripts/store.js";

    onMount(async () => {
        await setNetwork()
    });

    let account = localStorage.getItem('account');

    window.ethereum.on("accountsChanged", (accounts) => {
        if (!accounts.length) {
            account = null;
            localStorage.removeItem('account')
        }
    });


    let isMetamaskInstalled = typeof window.ethereum !== "undefined"

    let ethersData = {
        provider: "",
        signer: "",
        signerOrProvider: "",
    }

    let accountMenuOptions = [
        {
            id: "copy",
            name: "Copy Address",
            action: () => {
                if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
                    // this.showTooltip = true;
                    // setTimeout(() => {
                    //     this.showTooltip = false;
                    // }, 1000);
                    console.log(account)
                    return navigator.clipboard.writeText(account);
                }
                return Promise.reject("The Clipboard API is not available.");
            }
        },
        {
            id: "view",
            name: "View on Explorer",
            action: () => {
                window.open(`${$activeNetwork.blockExplorer}address/${account}`);
            },
        }
    ]

    async function getEthersData() {
        if (window.ethereum) {
            ethersData.provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            ethersData.signer = ethersData.provider.getSigner();
            ethersData.signerOrProvider = ethersData.signer ? ethersData.signer : ethersData.provider;
        }
    }

    getEthersData()

    async function setNetwork() {
        let network = await ethersData.provider.getNetwork();
        let connectedChainId = parseInt(network.chainId);
        let temp = networks.find(
            (network) => network.chainId === connectedChainId
        )
        activeNetwork.set(temp)
        return temp
    }

    async function handleNetworkSelect(event) {
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{chainId: `0x${(event.detail.selected.chainId).toString(16)}`}]
            });
            activeNetwork.set(event.detail.selected)
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: `0x${($activeNetwork.chainId).toString(16)}`,
                                chainName: $activeNetwork.name,
                                rpcUrls: [$activeNetwork.rpcUrl],
                                blockExplorerUrls: [$activeNetwork.scanURL],
                                nativeCurrency: {
                                    name: $activeNetwork.currencySymbol,
                                    symbol: $activeNetwork.currencySymbol,
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
                account = accounts[0];
                localStorage.setItem('account', account)
            } catch (error) {
                console.log(error);
            }
        }
    }

    export let url;
</script>
<Router url={url}>

  <div class="container">
    <div class="default-header">
      <div class="logo">
        <img src={logo} alt="sft logo">
        <div class="logo-label">SFCC</div>
      </div>
      {#if account}
        <div class="menu">
          <Select options={networks} on:select={handleNetworkSelect}
                  label={$activeNetwork?.name || 'Available networks'}></Select>
          <Select options={accountMenuOptions} label={account.replace(/(.{6}).*(.{4})/, "$1…$2")}/>
        </div>
      {/if}

    </div>
    {#if !account}
      <div>
        <div class="invalid-network">
          <label>To use the app:</label>
          <button class="connect-metamask-btn" on:click={()=>connect()}>
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
    {#if account}
      <div class="main-card">
        {#if $activeNetwork}
          <Route path="/" component={SftSetup} activeNetwork={$activeNetwork} ethersData={ethersData}/>
          <Route path="/admin" component={Admin}/>
        {/if}
        {#if !$activeNetwork}
          <div class="invalid-network">
            <label>Choose a supported network from the list above</label>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</Router>


<style lang="scss">
  @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css");

  .container {
    display: flex;
    flex-direction: column;
  }

  .default-header {
    justify-content: space-between;
    display: flex;
    width: 100%;
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
  }

  .invalid-network {
    background-color: transparent;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-top: 6rem;
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 66px;
    color: #FFFFFF;
  }

  .connect-metamask-btn {
    background: #2C2C54;
    border-radius: 30px;
    padding: 7px 35px;
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 42px;
    color: #FFFFFF;
    cursor: pointer;
    border: none;
  }

  .menu {
    display: flex;
  }
</style>