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
export declare type NumberProps = typeof __propDef.props;
export declare type NumberEvents = typeof __propDef.events;
export declare type NumberSlots = typeof __propDef.slots;
export default class Number extends SvelteComponentTyped<NumberProps, NumberEvents, NumberSlots> {
}
export {};
