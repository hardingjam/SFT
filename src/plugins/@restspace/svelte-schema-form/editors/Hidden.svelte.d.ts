import { SvelteComponentTyped } from "svelte";
import type { CommonComponentParameters } from "../types/CommonComponentParameters";
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
export declare type HiddenProps = typeof __propDef.props;
export declare type HiddenEvents = typeof __propDef.events;
export declare type HiddenSlots = typeof __propDef.slots;
export default class Hidden extends SvelteComponentTyped<HiddenProps, HiddenEvents, HiddenSlots> {
}
export {};
