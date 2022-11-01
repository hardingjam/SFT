<script>
    import {SubmitForm} from '../plugins/@restspace/svelte-schema-form';
    import {createEventDispatcher} from "svelte";
    import '../plugins/@restspace/svelte-schema-form/css/layout.css';
    import '../plugins/@restspace/svelte-schema-form/css/basic-skin.css';

    const dispatch = createEventDispatcher();
    export let schema = {}

    function selectOption(data) {
        dispatch('getFormData', data);
    }

    let value = {};

    const submit = (e) => {
        selectOption(e.detail.value, undefined, 2)
        // alert(JSON.stringify(e.detail.value, undefined, 2));
    }
</script>

<SubmitForm {schema} {value} on:submit={submit}/>