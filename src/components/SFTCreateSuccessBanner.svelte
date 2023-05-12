<script>
    import {SFTCreated} from "../scripts/store.js";

    export let topText = ""
    export let bottomText = ""
    export let noBottomText = false
    export let errorText = "";
    export let successText = "";
    export let transactionHash = null;

    import {createEventDispatcher} from 'svelte';
    import {navigateTo} from 'yrv';

    function goToRoles() {
        navigateTo("#roles", {replace: false});
    }

    const dispatch = createEventDispatcher();

    function closeBtnClick() {
        SFTCreated.set(false)
    }

    function clickOutside(node) {

        const handleClick = event => {
            if (node && !node.contains(event.target) && !event.defaultPrevented) {
                node.dispatchEvent(
                    new CustomEvent('click_outside', node)
                )
            }
        }

        document.addEventListener('click', handleClick, true);

        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        }
    }

</script>

<div class={$SFTCreated? "frame show": "frame hide" } use:clickOutside
     on:click_outside={closeBtnClick}>
  <div class="content">
    <div class="close-btn" on:click={closeBtnClick}>
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 14L28 28" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M28 14L14 28" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="sft-setup-success-container flex-col flex items-center ">
      <span class="mb-5">Your SFT setup was successful!</span>
      <svg class="mb-9" width="138" height="138" viewBox="0 0 138 138" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="69" cy="69" r="62" fill="white"/>
        <path d="M40.25 74.75L57.5 92L97.75 51.75" stroke="#1EA51B" stroke-width="6" stroke-linecap="round"
              stroke-linejoin="round"/>
        <circle cx="69" cy="69" r="51.75" stroke="#1EA51B" stroke-width="10" stroke-linecap="round"
                stroke-linejoin="round"/>
      </svg>

      <div
        class="info-text f-weight-700 mb-9">The ‘super admin address’ will need to assign roles to manage this token.
      </div>
      <button class="create-token btn-solid btn-submit mb-9"
              on:click={() => goToRoles()}>Ok, take me to roles
      </button>
    </div>
  </div>
</div>

<style>
    .frame {
        position: fixed;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        top: 50%;
        bottom: 0;
        background: rgba(88, 85, 90, 0.92);
        border-radius: 20px;
        width: 616px;
        z-index: 2;
        padding: 10px;
    }

    .content {
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.8);
        display: flex;
        height: 100%;
        flex-direction: column;
        color: #FFFFFF;
        font-family: 'Mukta', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 33px;
        position: relative;
        padding-top: 60px;
        padding-bottom: 40px;
        width: 100%;
    }

    .info-text {
        font-size: 14px;
        line-height: 23px;
        text-align: center
    }

    .create-token {
        width: 413px
    }

    .close-btn {
        align-self: end;
        margin-right: 15px;
        position: absolute;
        top: 13px;
        right: 20px;
        cursor: pointer;
    }

</style>