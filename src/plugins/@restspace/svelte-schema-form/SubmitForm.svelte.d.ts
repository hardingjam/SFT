import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        schema: any;
        value: any;
        uploadFiles?: Record<string, FileList> | undefined;
        uploadBaseUrl?: string | undefined;
        uploadNamePattern?: string | undefined;
        dirty?: boolean | undefined;
        action?: string | undefined;
        components?: Record<string, new (...args: any[]) => any> | undefined;
        collapsible?: boolean | undefined;
        submitText?: string | undefined;
        submitRequiresDirty?: boolean | undefined;
    };
    events: {
        value: CustomEvent<any>;
        submit: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type SubmitFormProps = typeof __propDef.props;
export declare type SubmitFormEvents = typeof __propDef.events;
export declare type SubmitFormSlots = typeof __propDef.slots;
export default class SubmitForm extends SvelteComponentTyped<SubmitFormProps, SubmitFormEvents, SubmitFormSlots> {
}
export {};
