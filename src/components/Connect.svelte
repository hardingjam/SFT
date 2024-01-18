<script>
    import {account} from '../scripts/store.js';
    import {connectAccount} from '../scripts/helpers.js';

    async function connect() {
        let acc = await connectAccount()
        account.set(acc);
    }

    export let action = ''
</script>
<div class="flex flex-col gap-2 w-full items-center h-full pt-20">
  <span class="to-text">To {action},&nbsp; connect your wallet </span>
  <div class="invalid-network f-weight-700">
    <button class="connect-metamask-btn f-weight-700" on:click={()=>connect()}>
      <span>Connect wallet</span>
    </button>
  </div>
</div>


<style>
    .connect-metamask-btn {
        border-radius: 30px;
        background: #2C2C54;
        color: #FFF;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        font-family: "Mukta", sans-serif;
        padding: 2px 32px;
        width: fit-content;
        cursor: pointer;
    }

    .to-text {
        color: #000;
        font-family: 'Mukta', sans-serif;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
</style>