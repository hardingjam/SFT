import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        schema: any;
        value: any;
        uploadFiles?: Record<string, FileList> | undefined;
        dirty?: boolean | undefined;
        showErrors?: boolean | undefined;
        collapsible?: boolean | undefined;
        components?: Record<string, new (...args: any[]) => any> | undefined;
        componentContext?: Record<string, unknown> | undefined;
    };
    events: {
        value: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type SchemaFormProps = typeof __propDef.props;
export declare type SchemaFormEvents = typeof __propDef.events;
export declare type SchemaFormSlots = typeof __propDef.slots;
export default class SchemaForm extends SvelteComponentTyped<SchemaFormProps, SchemaFormEvents, SchemaFormSlots> {
}
export {};
