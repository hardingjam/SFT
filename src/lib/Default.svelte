<script>
    import {activeNetwork, account, data, vault, tokens} from "../scripts/store.js";
    import Select from "../components/Select.svelte";
    import networks from "../scripts/networksConfig.js";
    import SftSetup from "../routes/SftSetup.svelte";
    import {ethers} from "ethers";
    import {onMount} from 'svelte';
    import {Router, Route, navigateTo, router} from "yrv"
    import Admin from "./../routes/Admin.svelte";
    import {icons} from '../scripts/assets.js'
    import Redeem from "../routes/Redeem.svelte";
    import Mint from "../routes/Mint.svelte";
    import {getContract, getSubgraphData} from "../scripts/helpers.js";
    import contractAbi from "../contract/OffchainAssetVaultAbi.json";
    import Tokens from "../routes/Tokens.svelte";

    let connectedAccount;
    export let url = '';

    let isMetamaskInstalled = typeof window.ethereum !== "undefined"

    let ethersData = {
        provider: "",
        signer: "",
        signerOrProvider: "",
    }

    let location = window.location.hash;
    let selectedTab = 'mint'

    router.subscribe(async e => {
        if (!e.initial) {
            await setVault()
            location = e.path
            selectedTab = location.slice(1) || 'mint'
        }
    });

    async function setVault() {
        let contractAddress = localStorage.getItem("vaultAddress")
        let contract = await getContract($activeNetwork, contractAddress, contractAbi, ethersData.signerOrProvider)
        if (contract) {
            vault.set(contract)
        } else {
            navigateTo("#setup", {replace: false})
        }
    }

    let accountMenuOptions = [
        {
            id: "copy",
            displayName: "Copy Address",
            action: () => {
                if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
                    // this.showTooltip = true;
                    // setTimeout(() => {
                    //     this.showTooltip = false;
                    // }, 1000);
                    return navigator.clipboard.writeText($account);
                }
                return Promise.reject("The Clipboard API is not available.");
            }
        },
        {
            id: "view",
            displayName: "View on Explorer",
            action: () => {
                window.open(`${$activeNetwork.blockExplorer}address/${$account}`);
            },
        }
    ]

    let menuItems = [
        {
            id: "setup",
            displayName: "SFT Setup",
            action: () => {
                navigateTo('#setup', {replace: false})
            }
        },
        {
            id: "admin",
            displayName: "Token Admin",
            action: () => {
                navigateTo('#admin', {replace: false})
            }
        },
        {
            id: "mint",
            displayName: "Mint/Redeem",
            action: () => {
                navigateTo('#mint', {replace: false})
            }
        },
        {
            id: "list",
            displayName: "Token List",
            action: () => {
                navigateTo('#list', {replace: false})
            }
        },
    ]

    onMount(async () => {
        await setVault()
        if (isMetamaskInstalled) {
            await setNetwork()
            connectedAccount = await getMetamaskConnectedAccount()
            if (connectedAccount) {
                account.set(connectedAccount)
                navigateTo(location || '#', {replace: false})
            } else {
                localStorage.removeItem('account')
            }

            window.ethereum.on("accountsChanged", (accounts) => {
                if (!accounts.length) {
                    account.set(null);
                    localStorage.removeItem('account')
                } else {
                    account.set(accounts[0]);
                    localStorage.setItem('account', $account)
                }
            });
        }
        if (location === '') {
            navigateTo('#setup')
        }
        if ($account) {
            await getTokens()
        }
    });


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
                                chainName: $activeNetwork.displayName,
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
                account.set(accounts[0]);
                localStorage.setItem('account', $account)
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function getMetamaskConnectedAccount() {
        if (isMetamaskInstalled) {
            const accounts = await ethersData.provider.listAccounts();
            return accounts.length > 0 ? accounts[0] : null;
        }
    }

    function changeUrl(tab) {
        navigateTo('#' + tab)
        selectedTab = tab
    }

    async function getTokens() {
        let query = `
        query {
          offchainAssetVaults{
            deployer,
            name,
            address
          }
        }`

        getSubgraphData($activeNetwork, {}, query, 'offchainAssetVaults').then((res) => {
            let temp = res.data.offchainAssetVaults.filter(token => token.deployer === $account.toLowerCase())
            tokens.set(temp)
        })
    }

</script>
<Router url={url}>

  <div class="">
    <div class="default-header">
      <div class="logo">
        <img src={icons.logo} alt="sft logo">
        <div class="logo-label">{$data?.offchainAssetVault?.name || ''}</div>
      </div>
      {#if $account}
        <div class="menu">
          <Select options={networks} on:select={handleNetworkSelect}
                  label={$activeNetwork?.displayName || 'Available networks'} className={'meinMenu'}
                  dropDownClass={'nav-dropdown'}>
            <span slot="icon" class="select-icon"><img src={icons[$activeNetwork?.icon]}
                                                       alt={$activeNetwork?.displayName}/></span>
          </Select>
          <Select className={'meinMenu'} options={accountMenuOptions}
                  label={$account.replace(/(.{6}).*(.{4})/, "$1…$2")}
                  staticLabel={true} dropDownClass={'nav-dropdown'}>
          </Select>

          <Select className={'meinMenu'} options={menuItems}
                  label="&#9776;"
                  staticLabel={true} showExpand="{false}">
          </Select>

        </div>
      {/if}

    </div>
    {#if !$account}
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
    {#if $account}
      <div class="main-card">
        {#if $activeNetwork}
          <Route path="#setup" component={SftSetup} ethersData={ethersData}/>
          <Route path="#admin" component={Admin}/>
          <Route path="#list" component={Tokens}/>

          <div class={location === '#mint' || location === "#redeem" ? 'tabs show' : 'tabs hide'}>
            <div class="tab-buttons">
              <button class:selected="{selectedTab === 'mint'}" class="tab-button"
                      on:click="{() =>  changeUrl('mint')}">
                Mint
              </button>
              <button class:selected="{selectedTab === 'redeem'}" class="redeem-tab tab-button"
                      on:click="{() =>  changeUrl('redeem')}">
                Redeem
              </button>
            </div>

            <div class="tab-panel-container">
              <Route path="#mint" component={Mint} ethersData={ethersData}/>
              <Route path="#redeem" component={Redeem} ethersData={ethersData}/>
            </div>
          </div>
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
  .container {
    display: flex;
    flex-direction: column;
  }

  .default-header {
    justify-content: space-between;
    display: flex;
    padding-left: 167px;
    width: 100%;
    padding-right: 65px;
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
    margin-top: -45px;
  }

  .invalid-network {
    background-color: transparent;
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-top: 6rem;
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

  .menu {
    display: flex;
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
    width: 492px;
    min-height: 535px;
    background: #FFFFFF;
    border-radius: 0 20px 20px 20px;
    padding-bottom: 20px;
  }

  .redeem-tab {
    border-radius: 10px 10px 0 0 !important;
    margin-left: 2px;
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

</style>