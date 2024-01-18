<script>
    import {account} from '../scripts/store.js';

    async function connect() {
        let acc = await connectAccount()
        account.set(acc);
    }
</script>
<div class="invalid-network f-weight-700">
  <button class="connect-metamask-btn f-weight-700" on:click={()=>connect()}>
    <span>Connect wallet</span>
  </button>
</div>

<style>
    .connect-metamask-btn {
        border-radius: 30px;
        background: #2C2C54;
        color: #FFF;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        font-family: "Mukta", sans-serif;
        padding: 6px 32px;
        width: fit-content;
        cursor: pointer;
    }
</style>