import { SvelteComponentTyped } from "svelte";
import type { CommonComponentParameters } from "./types/CommonComponentParameters";
declare const __propDef: {
    props: {
        params: CommonComponentParameters;
        schema: any;
        value: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type SubSchemaFormProps = typeof __propDef.props;
export declare type SubSchemaFormEvents = typeof __propDef.events;
export declare type SubSchemaFormSlots = typeof __propDef.slots;
export default class SubSchemaForm extends SvelteComponentTyped<SubSchemaFormProps, SubSchemaFormEvents, SubSchemaFormSlots> {
}
export {};
