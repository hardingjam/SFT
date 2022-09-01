<script>
    import {Tab, TabList, TabPanel, Tabs} from "../scripts/tabs.js";
    import {Router, Route} from "yrv";
    import Mint from "./Mint.svelte";
    import Redeem from "./Redeem.svelte";

    export let url = '';

    export let ethersData;
    let {signer, signerOrProvider, provider} = ethersData;
</script>

<Router url={url}>
  <Tabs>
    <TabList>
      <Tab href="/mint"> Mint</Tab>
      <Tab href="/redeem" isLast="{true}">Redeem</Tab>
    </TabList>

    <TabPanel>
      <Mint ethersData={ethersData}></Mint>
    </TabPanel>

    <TabPanel>
      <Redeem></Redeem>
    </TabPanel>

  </Tabs>
</Router>


<style>

</style>