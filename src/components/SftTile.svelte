<script>
    import logo from "../../src/assets/sft_logo.svg"

    export let sft = {}
</script>

<div class="w-full bg-white py-5 px-10 flex flex-row-reverse rounded-xl justify-between relative">
  <div>
    <img src="{logo}" alt="sft logo"/>
    <div class="absolute top-2 right-2 cursor-pointer">
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 10.3999L19 5.1999M19 5.1999L19 10.3999M19 5.1999L14 5.1999" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 10.3999L19 5.1999M19 5.1999L19 10.3999M19 5.1999L14 5.1999" stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 14.5601L5 19.7601M5 19.7601L5 14.5601M5 19.7601H10" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 14.5601L5 19.7601M5 19.7601L5 14.5601M5 19.7601H10" stroke="black" stroke-opacity="0.2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
  <table class="w-8/12 leading-8">
    <tr>
      <td class="font-bold">Token Name</td>
      <td class="sft-name">{sft.name}</td>
    </tr>
    <tr>
      <td class="font-bold">Token Symbol</td>
      <td class="sft-info">{sft.symbol}</td>
    </tr>
    <tr>
      <td class="font-bold">Creation Date</td>
      <td class="sft-info">{sft.date}</td>
    </tr>
    <tr>
      <td class="font-bold">Number of holders</td>
      <td class="sft-info">{sft.holders}</td>
    </tr>
    <tr>
      <td class="font-bold">Token Supply</td>
      <td class="sft-info">{sft.token_supply}</td>
    </tr>
    <tr>
      <td class="font-bold">Name of Auditor(s)</td>
      <td class="sft-info">{sft.auditors}</td>
    </tr>
    <tr>
      <td class="font-bold">Name of issuer</td>
      <td class="sft-info">{sft.issuer}</td>
    </tr>
  </table>
</div>

<style>
    .sft-name {
        color: #9D7334;
    }

    .sft-info{
        color: #575757
    }
</style>