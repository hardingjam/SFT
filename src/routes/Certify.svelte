<script>
    import {pageTitle, schemas, titleIcon, tokenName} from '../scripts/store.js';
    import {icons} from '../scripts/assets.js';
    import {onMount} from 'svelte';
    import Select from '../components/Select.svelte';
    import Schema from '../components/Schema.svelte';
    import {navigate} from '../scripts/helpers.js';

    onMount(async () => {
        pageTitle.set(`Certify`)
        titleIcon.set(`${icons.certify}`)
    })

    let selectedSchema = {}

    async function handleSchemaSelect(event) {
        selectedSchema = event.detail.selected
        const form = document.querySelector('.svelte-schema-form'); // select the form element
        if (form) {
            form.reset();
        }
    }

    function handleFileUpload(event) {
        // fileHashes = event.detail.fileHashes
        console.log(555)
    }
</script>

<div class="certify-container ">
  <div class="card-header justify-between pl-6 pr-10">
    <div class="flex gap-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.34875 11.499L11.3488 13.499L15.5 9.3478M11.7253 3.07754L5.72528 4.79182C5.29598 4.91448 5 5.30687 5 5.75335L5 10.8529C5 14.0824 6.55966 17.1131 9.18762 18.9902L11.4188 20.5839C11.7665 20.8322 12.2335 20.8322 12.5812 20.5839L14.8124 18.9902C17.4403 17.1131 19 14.0824 19 10.8529V5.75335C19 5.30687 18.704 4.91448 18.2747 4.79182L12.2747 3.07754C12.0952 3.02624 11.9048 3.02624 11.7253 3.07754Z"
          stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Certify
    </div>
    <button class="default-btn" on:click={()=>{navigate('#new-asset-class')}}>New schema</button>
  </div>
  <div class="flex items-center pt-10 pb-10 gap-5 ">Choose a schema for the audit report

    {#if $schemas.length}
      <div class="schema">
        <div class="schema-dropdown flex justify-between">
          <Select options={$schemas}
                  on:select={handleSchemaSelect}
                  width="170"
                  label={'Choose'} className={"inputSelect"} expandIcon={icons.expand_black}></Select>

        </div>
      </div>
    {/if}
  </div>

  <div class="schema-container card-content">
    <div class="flex w-full justify-center f-weight-700 mb-3">{$tokenName}</div>
    {#if selectedSchema.displayName}
      <div class="flex justify-between w-full mb-6 items-end">
        <span class="f-weight-700">Asset class</span>
        <div class="asset-class"> {selectedSchema.displayName}</div>
      </div>
    {/if}

    <Schema schema={selectedSchema} on:fileUpload={handleFileUpload}></Schema>

  </div>

  <div class="card-footer justify-between pl-6 pr-10">
    <button class="default-btn pl-14 pr-14">Certify</button>
  </div>

</div>
<style>
    .certify-container {
        border-radius: 10px;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .card-footer {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: flex-end;
        border-top-width: 1px;;
        padding: 13px 40px;
        gap: 20px;
    }

    .schema-container {
        border-radius: 10px;
        border: 1px solid var(--divider, #D2D2D2);
        padding: 15px 42px;
        margin: 0 20px 40px 20px;
        width: 630px;
        min-height: 300px;
        text-align: left;
    }

    .asset-class {
        border: 2px solid #ECECEC;
        border-radius: 5px;
        color: #000000;
        background: #ECECEC;
        width: 360px;
        height: 27px;
        margin-top: 8px;
        padding: 0 5px;
        text-align: left;
    }

</style>