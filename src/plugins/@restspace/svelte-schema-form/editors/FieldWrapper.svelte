<script>import { schemaLabel } from "../types/schema";
import { stringToHtml } from "../utilities";
export let params;
export let schema;
const title = schemaLabel(schema, params.path);
$: error = params.validationErrors[params.path.join('.')];
</script>

{#if params.containerParent !== "array"}
	<label for={params.path.join('.')} class:required={params.required} class:readonly={schema.readOnly || params.containerReadOnly}>
		{@html stringToHtml(title)}
		{#if schema.description}
			<span class="info" title={schema.description}></span>
		{/if}
	</label>
{/if}
<slot></slot>
{#if error && params.showErrors}
	<div class="error">{error}</div>
{/if}