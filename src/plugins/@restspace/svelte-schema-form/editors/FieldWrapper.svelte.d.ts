import { SvelteComponentTyped } from "svelte";
import type { CommonComponentParameters } from "../types/CommonComponentParameters";
declare const __propDef: {
    props: {
        params: CommonComponentParameters;
        schema: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type FieldWrapperProps = typeof __propDef.props;
export declare type FieldWrapperEvents = typeof __propDef.events;
export declare type FieldWrapperSlots = typeof __propDef.slots;
export default class FieldWrapper extends SvelteComponentTyped<FieldWrapperProps, FieldWrapperEvents, FieldWrapperSlots> {
}
export {};
