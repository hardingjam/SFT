<script>
    import {
        activeNetwork,
        transactionError,
        transactionInProgress,
        transactionInProgressShow,
        transactionSuccess
    } from "../scripts/store.js";
    import SftLoader from "./SftLoader.svelte";

    export let topText = ""
    export let bottomText = ""
    export let noBottomText = false
    export let errorText = "";
    export let successText = "";
    export let transactionHash = null;

    function viewInExplorer(hash) {
        window.open(`${$activeNetwork.blockExplorer}/tx/${hash}`);
    }

    import {createEventDispatcher} from 'svelte';
    import {TRANSACTION_IN_PROGRESS_TEXT, VIEW_ON_EXPLORER_TEXT} from "../scripts/consts.js";

    const dispatch = createEventDispatcher();

    function closeBtnClick() {
        transactionInProgressShow.set(false)
        dispatch('close', {
            close: true
        });
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

    let name = 'world';

    function handleClickOutside(event) {
        if ($transactionInProgressShow && !$transactionInProgress) {
            closeBtnClick()
        }
    }
</script>

<div class={$transactionInProgressShow? "frame show": "frame hide" } use:clickOutside
     on:click_outside={handleClickOutside}>
  <div class="content">
    {#if ($transactionInProgress)}
      <div class="top-text">{topText || TRANSACTION_IN_PROGRESS_TEXT}</div>
    {/if}
    {#if (!$transactionInProgress)}
      <div class="close-btn" on:click={closeBtnClick}>
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 14L28 28" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M28 14L14 28" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      {#if $transactionError}
        <div class="top-text">{errorText}</div>
        <svg width="138" height="138" viewBox="0 0 138 138" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="69" cy="69" r="62" fill="white"/>
          <path d="M51.75 51.75L86.25 86.25" stroke="#DD1212" stroke-width="6" stroke-linecap="round"
                stroke-linejoin="round"/>
          <path d="M86.25 51.75L51.75 86.25" stroke="#DD1212" stroke-width="6" stroke-linecap="round"
                stroke-linejoin="round"/>
          <circle cx="69" cy="69" r="51.75" stroke="#DD1212" stroke-width="10" stroke-linecap="round"
                  stroke-linejoin="round"/>
        </svg>
      {/if}
      {#if $transactionSuccess}
        <div class="top-text">{successText}</div>
        <svg width="138" height="138" viewBox="0 0 138 138" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="69" cy="69" r="62" fill="white"/>
          <path d="M40.25 74.75L57.5 92L97.75 51.75" stroke="#1EA51B" stroke-width="6" stroke-linecap="round"
                stroke-linejoin="round"/>
          <circle cx="69" cy="69" r="51.75" stroke="#1EA51B" stroke-width="10" stroke-linecap="round"
                  stroke-linejoin="round"/>
        </svg>

      {/if}
    {/if}
    {#if ($transactionInProgress)}
      <SftLoader></SftLoader>
    {/if}
    {#if !noBottomText}
      <div class="bottom-text underline"
           on:click={()=>viewInExplorer(transactionHash)}>{bottomText || VIEW_ON_EXPLORER_TEXT}&nbsp; &nbsp;
        <span class="icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
    d="M11.9813 1.16793C12.6529 1.16494 13.1143 1.16364 13.4658 1.20202C13.58 1.2145 13.6755 1.23057 13.7566 1.25L6.67094 8.33565C6.47567 8.53091 6.47567 8.84749 6.67094 9.04275C6.8662 9.23801 7.18278 9.23801 7.37804 9.04275L14.4637 1.95711C14.4831 2.03818 14.4992 2.13365 14.5117 2.24787C14.5501 2.59937 14.5487 3.0608 14.5458 3.73237L14.5384 5.38714C14.5371 5.66328 14.76 5.88813 15.0361 5.88936C15.3123 5.89059 15.5371 5.66774 15.5384 5.3916L15.5459 3.70704C15.5487 3.07256 15.551 2.554 15.5058 2.13931C15.4587 1.70809 15.355 1.32632 15.1007 0.997796C15.0457 0.92668 14.9863 0.859158 14.9229 0.795598C14.858 0.73042 14.7888 0.669415 14.7159 0.612977C14.3874 0.358736 14.0056 0.255023 13.5744 0.207931C13.1597 0.162645 12.6411 0.164968 12.0067 0.16781L10.3221 0.175327C10.0459 0.176559 9.82309 0.401413 9.82432 0.677552C9.82556 0.953692 10.0504 1.17655 10.3266 1.17532L11.9813 1.16793Z"
    fill="white"/>
<path
    d="M8.67331 2.29454C8.26955 2.2897 7.82483 2.2897 7.33615 2.2897H7.30382C6.07946 2.2897 5.11973 2.28969 4.3583 2.37219C3.58128 2.45637 2.95169 2.63125 2.41414 3.0218C2.08871 3.25824 1.80252 3.54443 1.56609 3.86986C1.17553 4.40741 1.00066 5.03699 0.91647 5.81402C0.833975 6.57544 0.833979 7.53518 0.833984 8.75953V8.81987C0.833979 10.0442 0.833975 11.004 0.91647 11.7654C1.00066 12.5424 1.17553 13.172 1.56609 13.7095C1.80252 14.035 2.08871 14.3212 2.41414 14.5576C2.95169 14.9482 3.58128 15.123 4.3583 15.2072C5.11971 15.2897 6.07943 15.2897 7.30375 15.2897H7.36417C8.58849 15.2897 9.54826 15.2897 10.3097 15.2072C11.0867 15.123 11.7163 14.9482 12.2538 14.5576C12.5793 14.3212 12.8654 14.035 13.1019 13.7095C13.4924 13.172 13.6673 12.5424 13.7515 11.7654C13.834 11.004 13.834 10.0443 13.834 8.81993V8.7874C13.834 8.29877 13.834 7.85409 13.8291 7.45037C13.8258 7.17425 13.5993 6.95309 13.3232 6.9564C13.0471 6.95971 12.8259 7.18624 12.8292 7.46236C12.834 7.85954 12.834 8.29858 12.834 8.7897C12.834 10.0507 12.8333 10.9564 12.7573 11.6577C12.6824 12.3496 12.5389 12.7831 12.2929 13.1218C12.1181 13.3623 11.9066 13.5738 11.666 13.7486C11.3274 13.9946 10.8939 14.1381 10.202 14.213C9.50066 14.289 8.59503 14.2897 7.33398 14.2897C6.07294 14.2897 5.16731 14.289 4.46601 14.213C3.77407 14.1381 3.3406 13.9946 3.00193 13.7486C2.76139 13.5738 2.54986 13.3623 2.3751 13.1218C2.12905 12.7831 1.98562 12.3496 1.91065 11.6577C1.83467 10.9564 1.83398 10.0507 1.83398 8.7897C1.83398 7.52865 1.83467 6.62303 1.91065 5.92173C1.98562 5.22979 2.12905 4.79631 2.3751 4.45764C2.54986 4.21711 2.76139 4.00558 3.00193 3.83082C3.3406 3.58476 3.77407 3.44134 4.46601 3.36637C5.16731 3.29039 6.07294 3.2897 7.33398 3.2897C7.82511 3.2897 8.26415 3.28971 8.66133 3.29447C8.93745 3.29778 9.16397 3.07662 9.16728 2.8005C9.17059 2.52438 8.94943 2.29785 8.67331 2.29454Z"
    fill="white"/>
<path
    d="M11.9813 1.16793C12.6529 1.16494 13.1143 1.16364 13.4658 1.20202C13.58 1.2145 13.6755 1.23057 13.7566 1.25L6.67094 8.33565C6.47567 8.53091 6.47567 8.84749 6.67094 9.04275C6.8662 9.23801 7.18278 9.23801 7.37804 9.04275L14.4637 1.95711C14.4831 2.03818 14.4992 2.13365 14.5117 2.24787C14.5501 2.59937 14.5487 3.0608 14.5458 3.73237L14.5384 5.38714C14.5371 5.66328 14.76 5.88813 15.0361 5.88936C15.3123 5.89059 15.5371 5.66774 15.5384 5.3916L15.5459 3.70704C15.5487 3.07256 15.551 2.554 15.5058 2.13931C15.4587 1.70809 15.355 1.32632 15.1007 0.997796C15.0457 0.92668 14.9863 0.859158 14.9229 0.795598C14.858 0.73042 14.7888 0.669415 14.7159 0.612977C14.3874 0.358736 14.0056 0.255023 13.5744 0.207931C13.1597 0.162645 12.6411 0.164968 12.0067 0.16781L10.3221 0.175327C10.0459 0.176559 9.82309 0.401413 9.82432 0.677552C9.82556 0.953692 10.0504 1.17655 10.3266 1.17532L11.9813 1.16793Z"
    stroke="white" stroke-linecap="round"/>
<path
    d="M8.67331 2.29454C8.26955 2.2897 7.82483 2.2897 7.33615 2.2897H7.30382C6.07946 2.2897 5.11973 2.28969 4.3583 2.37219C3.58128 2.45637 2.95169 2.63125 2.41414 3.0218C2.08871 3.25824 1.80252 3.54443 1.56609 3.86986C1.17553 4.40741 1.00066 5.03699 0.91647 5.81402C0.833975 6.57544 0.833979 7.53518 0.833984 8.75953V8.81987C0.833979 10.0442 0.833975 11.004 0.91647 11.7654C1.00066 12.5424 1.17553 13.172 1.56609 13.7095C1.80252 14.035 2.08871 14.3212 2.41414 14.5576C2.95169 14.9482 3.58128 15.123 4.3583 15.2072C5.11971 15.2897 6.07943 15.2897 7.30375 15.2897H7.36417C8.58849 15.2897 9.54826 15.2897 10.3097 15.2072C11.0867 15.123 11.7163 14.9482 12.2538 14.5576C12.5793 14.3212 12.8654 14.035 13.1019 13.7095C13.4924 13.172 13.6673 12.5424 13.7515 11.7654C13.834 11.004 13.834 10.0443 13.834 8.81993V8.7874C13.834 8.29877 13.834 7.85409 13.8291 7.45037C13.8258 7.17425 13.5993 6.95309 13.3232 6.9564C13.0471 6.95971 12.8259 7.18624 12.8292 7.46236C12.834 7.85954 12.834 8.29858 12.834 8.7897C12.834 10.0507 12.8333 10.9564 12.7573 11.6577C12.6824 12.3496 12.5389 12.7831 12.2929 13.1218C12.1181 13.3623 11.9066 13.5738 11.666 13.7486C11.3274 13.9946 10.8939 14.1381 10.202 14.213C9.50066 14.289 8.59503 14.2897 7.33398 14.2897C6.07294 14.2897 5.16731 14.289 4.46601 14.213C3.77407 14.1381 3.3406 13.9946 3.00193 13.7486C2.76139 13.5738 2.54986 13.3623 2.3751 13.1218C2.12905 12.7831 1.98562 12.3496 1.91065 11.6577C1.83467 10.9564 1.83398 10.0507 1.83398 8.7897C1.83398 7.52865 1.83467 6.62303 1.91065 5.92173C1.98562 5.22979 2.12905 4.79631 2.3751 4.45764C2.54986 4.21711 2.76139 4.00558 3.00193 3.83082C3.3406 3.58476 3.77407 3.44134 4.46601 3.36637C5.16731 3.29039 6.07294 3.2897 7.33398 3.2897C7.82511 3.2897 8.26415 3.28971 8.66133 3.29447C8.93745 3.29778 9.16397 3.07662 9.16728 2.8005C9.17059 2.52438 8.94943 2.29785 8.67331 2.29454Z"
    stroke="white" stroke-linecap="round"/>
</svg>
      </span>
      </div>
    {/if}

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
        border-radius: 10px;
        width: 420px;
        height: 420px;
        z-index: 3;
        padding: 10px;
    }

    .content {
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: space-between;
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
        padding-bottom: 60px;
        width: 100%;
    }

    .bottom-text {
        cursor: pointer;
        display: flex;
        align-items: center;
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