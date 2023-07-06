<script>
    // import {markdown} from '../assets/documents/gildlab-manual.js';
    // import {marked} from 'marked'

    import manual from "../assets/documents/manual.pdf"


</script>

<div class="pdf-container">
  <!--  <div class="preview">{@html marked(markdown)}</div>-->
  <iframe src={`${manual}#view=fit`} height="100%" width="100%"></iframe>

</div>


<style>
    .pdf-container {
        /*background: #FFFFFF;*/
        /*padding: 0 1rem;*/
        /*text-align: left;*/
        /*width: calc(100vw - 223px);*/
        /*margin-left: 203px;*/
        /*margin-top: -48px;*/

        width: calc(100vw - 223px);
        height: calc(100vh - 100px);
        margin-left: 203px;
        margin-top: -48px;
        margin-bottom: -80px;
    }
</style>
