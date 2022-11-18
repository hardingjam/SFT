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
export declare type StringProps = typeof __propDef.props;
export declare type StringEvents = typeof __propDef.events;
export declare type StringSlots = typeof __propDef.slots;
export default class String extends SvelteComponentTyped<StringProps, StringEvents, StringSlots> {
}
export {};
