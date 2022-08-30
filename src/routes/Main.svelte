<script>
    import {Tab, TabList, TabPanel, Tabs} from "../scripts/tabs.js";
    import {Router} from "yrv";
    import Mint from "./Mint.svelte";
    import Redeem from "./Redeem.svelte";

    export let url = '';


</script>

<Router url={url}>
  <Tabs>
    <TabList>
      <Tab href="/mint"> Mint</Tab>
      <Tab href="/redeem" isLast="{true}">Redeem</Tab>
    </TabList>

    <TabPanel>
      <Mint></Mint>
    </TabPanel>

    <TabPanel>
      <Redeem></Redeem>
    </TabPanel>

  </Tabs>
</Router>


<style>

</style>