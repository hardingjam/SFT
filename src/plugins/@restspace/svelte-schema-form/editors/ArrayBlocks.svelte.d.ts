import { SvelteComponentTyped } from "svelte";
import type { CommonComponentParameters } from "../types/CommonComponentParameters";
declare const __propDef: {
    props: {
        params: CommonComponentParameters;
        schema: any;
        value: any[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ArrayBlocksProps = typeof __propDef.props;
export declare type ArrayBlocksEvents = typeof __propDef.events;
export declare type ArrayBlocksSlots = typeof __propDef.slots;
export default class ArrayBlocks extends SvelteComponentTyped<ArrayBlocksProps, ArrayBlocksEvents, ArrayBlocksSlots> {
}
export {};
