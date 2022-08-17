<script>
    import Select from "../components/Select.svelte";
    import networks from "../config/networksConfig.js";

    let activeNetwork;

    async function handleNetworkSelect(event) {
        activeNetwork = event.detail.activeNetwork
        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{chainId: `0x${(activeNetwork.chainId).toString(16)}`}]
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                            {
                                chainId: `0x${(activeNetwork.chainId).toString(16)}`,
                                chainName: activeNetwork.name,
                                rpcUrls: [activeNetwork.rpcUrl],
                                blockExplorerUrls: [activeNetwork.scanURL],
                                nativeCurrency: {
                                    name: activeNetwork.currencySymbol,
                                    symbol: activeNetwork.currencySymbol,
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
</script>

<div class="container">
  <div class="logo">
    <img src="public/SFT.svg" alt="sft logo">
    <div class="logo-label">SFCC</div>
  </div>

  <div class="menu">
    <Select options={networks} on:select={handleNetworkSelect}></Select>
  </div>
</div>

<style lang="scss">
  .container {
    max-width: 1200px;
    left: 167px;
    top: 52px;
    margin-right: 65px;
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .container .logo-label {
    font-family: 'Mukta', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 30px;
    color: #F9DFA0;
  }

</style>