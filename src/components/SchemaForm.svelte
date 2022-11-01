<script>
    import {SubmitForm} from '../plugins/@restspace/svelte-schema-form';
    import '../plugins/@restspace/svelte-schema-form/css/layout.css';
    import '../plugins/@restspace/svelte-schema-form/css/basic-skin.css';
    export let schema = {}
    let value = {};

</script>

<SubmitForm {schema} {value}/>