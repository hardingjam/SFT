import { SvelteComponentTyped } from "svelte";
import type { CommonComponentParameters } from "../types/CommonComponentParameters";
declare const __propDef: {
    props: {
        params: CommonComponentParameters;
        schema: any;
        value: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type BooleanProps = typeof __propDef.props;
export declare type BooleanEvents = typeof __propDef.events;
export declare type BooleanSlots = typeof __propDef.slots;
export default class Boolean extends SvelteComponentTyped<BooleanProps, BooleanEvents, BooleanSlots> {
}
export {};
