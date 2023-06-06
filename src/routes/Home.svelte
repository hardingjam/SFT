<script>
    import SftTile from "../components/SftTile.svelte";
    import SftList from "../components/SftList.svelte";
    import {sftInfo} from "../scripts/store.js";

    let view = "tile";
    let offchainAssetReceiptVaults = [
        {
            name: "OPUS",
            symbol: "OPS",
            date: "30/09/2021",
            holders: "3,000,000",
            token_supply: "123,000,000",
            auditors: "KPMG",
            issuer: "British Land",
        }, {
            name: "OPUS1",
            symbol: "OPS",
            date: "30/09/2021",
            holders: "3,000,000",
            token_supply: "123,000,000",
            auditors: "KPMG",
            issuer: "British Land",
        }, {
            name: "OPUS2",
            symbol: "OPS",
            date: "30/09/2021",
            holders: "3,000,000",
            token_supply: "123,000,000",
            auditors: "KPMG",
            issuer: "British Land",
        }, {
            name: "OPUS3",
            symbol: "OPS",
            date: "30/09/2021",
            holders: "3,000,000",
            token_supply: "123,000,000",
            auditors: "KPMG",
            issuer: "British Land",
        }
    ]
</script>
<div class="flex flex-col w-full">
  <div class="views flex justify-end w-full space-x-6 pr-20 pt-5">
    <div class="cursor-pointer" on:click={()=>{view = "tile"}}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 2C1 1.44772 1.44772 1 2 1H6C6.55228 1 7 1.44772 7 2V6C7 6.55228 6.55228 7 6 7H2C1.44772 7 1 6.55228 1 6V2Z"
          stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M1 2C1 1.44772 1.44772 1 2 1H6C6.55228 1 7 1.44772 7 2V6C7 6.55228 6.55228 7 6 7H2C1.44772 7 1 6.55228 1 6V2Z"
          stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M1 12C1 11.4477 1.44772 11 2 11H6C6.55228 11 7 11.4477 7 12V16C7 16.5523 6.55228 17 6 17H2C1.44772 17 1 16.5523 1 16V12Z"
          stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M1 12C1 11.4477 1.44772 11 2 11H6C6.55228 11 7 11.4477 7 12V16C7 16.5523 6.55228 17 6 17H2C1.44772 17 1 16.5523 1 16V12Z"
          stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M11 2C11 1.44772 11.4477 1 12 1H16C16.5523 1 17 1.44772 17 2V6C17 6.55228 16.5523 7 16 7H12C11.4477 7 11 6.55228 11 6V2Z"
          stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M11 2C11 1.44772 11.4477 1 12 1H16C16.5523 1 17 1.44772 17 2V6C17 6.55228 16.5523 7 16 7H12C11.4477 7 11 6.55228 11 6V2Z"
          stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M11 12C11 11.4477 11.4477 11 12 11H16C16.5523 11 17 11.4477 17 12V16C17 16.5523 16.5523 17 16 17H12C11.4477 17 11 16.5523 11 16V12Z"
          stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M11 12C11 11.4477 11.4477 11 12 11H16C16.5523 11 17 11.4477 17 12V16C17 16.5523 16.5523 17 16 17H12C11.4477 17 11 16.5523 11 16V12Z"
          stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="cursor-pointer" on:click={()=>{view = "list"}}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 6V2C1 1.44772 1.44772 1 2 1H16C16.5523 1 17 1.44772 17 2V6M1 6H17M1 6V12M17 6V12M17 12V16C17 16.5523 16.5523 17 16 17H2C1.44772 17 1 16.5523 1 16V12M17 12H1"
          stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path
          d="M1 6V2C1 1.44772 1.44772 1 2 1H16C16.5523 1 17 1.44772 17 2V6M1 6H17M1 6V12M17 6V12M17 12V16C17 16.5523 16.5523 17 16 17H2C1.44772 17 1 16.5523 1 16V12M17 12H1"
          stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <div class={$sftInfo? "content mt-5 w-full" : "content mt-5 w-8/12" } >
    {#if (view === "tile")}
      <div class="grid grid-cols-2 gap-5">
        {#each offchainAssetReceiptVaults as sft }
          <SftTile sft={sft}></SftTile>
        {/each}
      </div>
    {/if}
    {#if (view === "list")}
      <SftList sfts={offchainAssetReceiptVaults}></SftList>
    {/if}
  </div>
</div>


