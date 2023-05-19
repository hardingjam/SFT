<script>
    import {markdown} from '../assets/documents/gildlab-manual.js';
    import {marked} from 'marked'

</script>

<div class="pdf-container">
  <div class="preview">{@html marked(markdown)}</div>
</div>


<style>
    .pdf-container {
        background: #FFFFFF;
        padding: 0 1rem;
        text-align: left;
        width: calc(100vw - 223px);
        margin-left: 203px;
        margin-top: -48px;
    }
</style>