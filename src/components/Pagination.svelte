<script>
    import {createEventDispatcher} from 'svelte';

    export let dataLength = 0
    export let perPage = 20
    let currentPage = 1;
    let showingStart = 1;
    let showingEnd = 1;

    let pagesArray = [1];
    let totalPages;

    $:dataLength && getTotalPages()
    $:currentPage && handlePageChange()

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage += 1;
            // Find the index of the '...' element in the array
            const ellipsisIndex = pagesArray.indexOf('...');

            // Check if the ellipsis exists in the array
            if (currentPage > 3 && currentPage < totalPages && ellipsisIndex !== -1 && pagesArray.length < totalPages +
                1) {
                // Get the last page number before the ellipsis
                const lastPageNumber = pagesArray[ellipsisIndex - 1];
                // Calculate the next page number
                const nextPageNumber = lastPageNumber + 1;

                // Insert the next page number at the correct place in the array
                pagesArray.splice(ellipsisIndex, 0, nextPageNumber);
                pagesArray = [...pagesArray]
            }
        }
    }

    function previousPage() {
        if (currentPage > 1) {
            currentPage -= 1;
        }
    }

    function getTotalPages() {
        totalPages = Math.ceil(dataLength / perPage);
        for (let i = 2; i < totalPages + 1; i++) {
            pagesArray = [...pagesArray, i]
            if (i > 2 && totalPages > 3) {
                pagesArray = [...pagesArray, "..."]
                break
            }
        }
        if (totalPages > 3) {
            pagesArray = [...pagesArray, totalPages]
        }
        showingStart = currentPage * perPage - perPage + 1
        showingEnd = currentPage * perPage > dataLength ? dataLength : currentPage * perPage
    }

    function setPage(page) {
        currentPage = page
    }

    const dispatch = createEventDispatcher();

    function handlePageChange() {
        showingStart = currentPage * perPage - perPage + 1
        showingEnd = currentPage * perPage > dataLength ? dataLength : currentPage * perPage
        dispatch('pageChange', {
            currentPage
        });
    }
</script>

<div class="pagination-container">
  <div class="showing">Showing <span class="font-bold">{showingStart}-{showingEnd}</span> of
    <span class="font-bold">{dataLength}</span>
  </div>
  <slot name="actions"></slot>
  <div class="pagination">
    <button on:click={previousPage} disabled={currentPage === 1} class="previous-button">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 19L9.20711 12.7071C8.81658 12.3166 8.81658 11.6834 9.20711 11.2929L15.5 5" stroke="#9D7334"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    {#each pagesArray as page, i}
      <div on:click={()=>{setPage(page)}}
           class="pagination-button {i===pagesArray.length-1? 'last':''} {page===currentPage ? 'active':''}">{page}</div>
    {/each}
    <button class="next-button" on:click={nextPage} disabled={currentPage === totalPages}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5 19L14.7929 12.7071C15.1834 12.3166 15.1834 11.6834 14.7929 11.2929L8.5 5" stroke="#9D7334"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="page-button"></div>
  </div>
</div>

<style>
    .pagination-container {
        padding: 0 45px 0 120px;
        background: #FFFFFF;
        position: absolute;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 90px;
        align-items: center;
        bottom: -90px;
    }

    .pagination {
        border-radius: 4px;
        border: 1px solid #D1D5DB;
        display: flex;
        align-items: center;
    }

    .pagination-button {
        padding: 3px 14px;
        border-left: 1px solid #D1D5DB;
    }

    .pagination-button:hover, .next-button:hover, .previous-button:hover {
        cursor: pointer;
        background: #ECECEC;
    }

    .next-button, .previous-button {
        padding: 5px 12px;
    }

    .next-button:disabled, .previous-button:disabled {
        opacity: 0.3;
    }

    .next-button:disabled:hover, .previous-button:disabled:hover {
        cursor: default;
        background: none;
    }

    .pagination-button.last {
        border-right: 1px solid #D1D5DB;
    }

    .pagination-button.active {
        background: #E1EFFE;
    }
</style>