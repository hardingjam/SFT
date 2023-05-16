<script>import {after, afterLast} from "../utilities";
import {getContext} from "svelte";
import {FileNone, ProgressContext} from "../types/CommonComponentParameters";
import {fileDropped, uploadBtnLoading} from "../../../../scripts/store.js";

export let params;
export let schema;
export let value;
export let highlight = false;
// Uplaod holds files locally as a FileList in the input type="files" element until the form is submitted.
// In JS mode, the SubmitForm will manage sending all the files to appropriate urls via PUT requests, then
// update the JSON value for the form with the url to which the file was sent. Thumbnails for the FileList
// stage must be created imperatively, but thumbnails which use the stored urls can be managed by Svelte
// rendering
const isMultiple = schema.multiple || false;
let inp;
let dropArea;
let uploaded;
let pathProgress = getContext(ProgressContext);
let progress;
$: progress = $pathProgress[params.path.join('.')] || {};
let renderedThumbnails = [];
let details = {};
let mode = "uploader";
$: {
    // run this to remove any local file thumbnails stored in a FileList once upload is done
    if (value && (value.startsWith('http') || value.startsWith('/')) && renderedThumbnails.length > 0) {
        renderedThumbnails.forEach(rt => rt.remove());
        renderedThumbnails = [];
    }
}
$: readOnly = schema.readOnly || params.containerReadOnly || false;
const chooseFile = () => {
    if (!isMultiple) {
        if ((inp.files?.length || 0) > 1) {
            alert('Please only upload one file');
            inp.files = null;
            return;
        }
        const file = inp.files?.item(0);
        if (!file)
            return;
        if (schema.warningKb && file.size > schema.warningKb * 1024) {
            alert(`The file is larger than the recommended maximum size of ${schema.warningKb}KB - consider compressing it`);
        }
        if (schema.maximumKb && file.size > schema.maximumKb * 1024) {
            alert(`The file is larger than the allowed maximum of ${schema.maximumKb}KB - please compress it first`);
            inp.files = null;
            return;
        }
        params.pathChanged(params.path, inp.files);
        renderThumbnail(file);
        details[file.name] = {
            mimeType: file.type,
            size: file.size
        };
        fileDropped.set({file, prop: params.path[0]})
    }
};
const onInput = (ev) => {
    chooseFile();
};
const dragEnter = (ev) => {
    if (readOnly || ev.dataTransfer?.types[0] !== "Files")
        return;
    highlight = true;
    ev.preventDefault();
};
const dragOver = (ev) => {
    if (readOnly || ev.dataTransfer?.types[0] !== "Files")
        return;
    ev.preventDefault();
};
const dragLeave = (ev) => {
    if (readOnly)
        return;
    highlight = false;
};
const renderThumbnail = (file) => {
    deleteUploads()
    uploaded = file.name.replace(new RegExp('(^.{4}).+'), '$1' + '…') + afterLast(file.name, ".");
};
const drop = (ev) => {
    if (schema.readOnly)
        return;
    ev.preventDefault();
    highlight = false;
    if (!ev.dataTransfer)
        return;
    const {files} = ev.dataTransfer;
    inp.files = files;
    chooseFile();
};
const deleteUploads = () => {
    inp.files = null;
    renderedThumbnails.forEach(n => n.remove());
    renderedThumbnails = [];
    details = {};
    value = '';
    params.pathChanged(params.path, FileNone);
    params.pathChanged(params.path, value);
    fileDropped.set({file: File, prop: params.path[0]})
};

const openFile = () => {
    if (readOnly)
        return;
    inp.click();
};

</script>

<svelte:component this={params.components['fieldWrapper']} {params} {schema}>
  <input bind:this={inp} id={params.path.join('.')} name={params.path.join('.')}
         type="file"
         readonly={readOnly}
         on:input={onInput}
         style="display: none" disabled={$uploadBtnLoading}/>
  <div class="flex items-center">
    <div class="sf-drop-area {mode} default-btn"
         class:highlight
         tabIndex="0"
         on:dragenter={dragEnter}
         on:dragover={dragOver}
         on:dragleave={dragLeave}
         on:drop={drop}
         on:click={openFile}
         bind:this={dropArea}>
      <div class="sf-upload-caption">
        Upload
      </div>
    </div>
    <div class="sf-upload-file ml-2" title={uploaded}>{uploaded || ""}</div>
  </div>

  {#if Object.keys(progress).length > 0}
    <div class="sf-progress-bars">
      {#each Object.entries(progress) as [name, percent]}
        <div class="sf-progress-bar">
          <div class="sf-progress-done" style="width: {percent}%"></div>
          {name}
        </div>
      {/each}
    </div>
  {/if}
</svelte:component>