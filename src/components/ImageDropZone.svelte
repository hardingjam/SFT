<script>
    import {fade} from "svelte/transition";
    import Spinner from "./Spinner.svelte";
    import {filedrop} from "filedrop-svelte";
    import {writable} from "svelte/store";
    import {onMount} from "svelte";
    import axios from "axios";

    export let imageFile;
    const upload = async (data, progressStore) => {
        const url = `https://gildlab-ipfs.in.ngrok.io/api/v0/add`;
        let formData = new FormData();
        // if we're pinning metadata (objets)
        if (data instanceof Array) {
            data = data
            for (const [i, d] of data.entries()) {
                const blob = new Blob([JSON.stringify(d, null, 2)], {type: 'application/json'});
                formData.append(`file`, blob, `dir/${i}.json`);
            }
        }
        // or we're pinning the media file
        else {
            formData.append('file', data, data.name)
        }

        const response = await axios.request({
            url,
            method: 'post',
            headers: {
                "Content-Type": `multipart/form-data;`,
            },
            data: formData,
            onUploadProgress: ((p) => {
                console.log(`Uploading...  ${p.loaded} / ${p.total}`);
                progressStore.set(p.loaded / p.total);
            }),
        })
        return response.data
    };
    export let mediaUploadResp = null;

    let options = {};
    let image, uploadComplete, error;

    const progress = writable(0);
    $: progressPercent = `${Math.floor($progress * 100)}%`;

    onMount(() => {
        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }
    });

    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            // convert image file to base64 string
            image.src = reader.result;
        },
        false
    );

    const readFile = async (files) => {
        error = null;
        uploadComplete = false;
        $progress = 0;
        reader.readAsDataURL(files.accepted[0]);
        imageFile = files.accepted[0];
        try {
            mediaUploadResp = await upload(imageFile, progress);
            if (mediaUploadResp?.name === "AxiosError") {
                error = "whoops... try again 😭";
            } else {
                uploadComplete = true;
            }
        } catch {
            error = "whoops... try again 😭";
        }
    };

    $: imageDropped = image?.src;

    export const validate = async () => {
        if (!mediaUploadResp?.IpfsHash) {
            error = "No image uploaded";
            return {
                ok: false,
            };
        } else {
            error = null;
            return {
                ok: true,
                mediaUploadResp,
            };
        }
    };
</script>

<div
    use:filedrop={options}
    on:filedrop={(e) => {
    readFile(e.detail.files);
  }}
    class="flex flex-col justify-center items-center aspect-square bg-gray-800 border-dashed border-gray-600 relative"
    class:border={!imageDropped}
>
  {#if !imageDropped}
    <span>Drop your artwork here</span>
    <span class="underline text-gray-400">Pick a file</span>
  {/if}

  {#if $progress || error}
    <div
        in:fade
        class="absolute top-2 right-2 flex flex-row items-center gap-x-2 text-sm bg-black bg-opacity-70 p-3 rounded-full"
    >
      {#if uploadComplete}
        <span in:fade> Uploaded </span>
      {:else if error}
        <span class="text-red-400" in:fade>
          {error}
        </span>
      {:else}
        {progressPercent}
        <Spinner/>
      {/if}
    </div>
  {/if}

  {#if imageDropped}
    <span
        class="bg-black bg-opacity-70 hover:bg-gray-900 transition-colors cursor-pointer rounded-full absolute mx-auto bottom-3 px-5 py-2"
    >Replace</span
    >
  {/if}
</div>