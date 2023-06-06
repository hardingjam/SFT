<script>
    import logo from "../assets/sft_logo.svg"
    export let sfts = []
</script>

<table class="w-full leading-7 text-center">
  <thead>
  <tr class="text-white text-bold">
    <th></th>
    <th>Token Name</th>
    <th>Token Symbol</th>
    <th>Creation Date</th>
    <th>Number of holders</th>
    <th>Token Supply</th>
    <th>Auditor(s)</th>
    <th>Name of issuer</th>
  </tr>
  </thead>
  <tbody>
  {#each sfts as sft }
    <tr>
      <td class="flex justify-center w-10">
        <img class="w-5 h-5 mt-1" src={logo} alt="sft logo"/>
      </td>
      <td class="sft-name">{sft.name}</td>
      <td class="sft-info">{sft.symbol}</td>
      <td class="sft-info">{sft.date}</td>
      <td class="sft-info">{sft.holders}</td>
      <td class="sft-info">{sft.token_supply}</td>
      <td class="sft-info">{sft.auditors}</td>
      <td class="sft-info">{sft.issuer}</td>
    </tr>
  {/each}
  </tbody>
</table>
<style>
    .sft-name {
        color: #9D7334;
    }

    .sft-info{
        color: #575757
    }

    thead tr {
        background-color: #9196C5;
    }

    tbody tr:nth-child(even) {
        background-color: #F0EFF1;
    }
    tbody tr:nth-child(odd) {
        background-color: #FFFFFF;
    }

    table thead tr:first-child th:first-child {
        border-top-left-radius: 10px;
    }
    table thead tr:first-child th:last-child {
        border-top-right-radius: 10px;
    }
</style>