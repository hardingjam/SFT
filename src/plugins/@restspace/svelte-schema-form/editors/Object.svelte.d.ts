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
export declare type ObjectProps = typeof __propDef.props;
export declare type ObjectEvents = typeof __propDef.events;
export declare type ObjectSlots = typeof __propDef.slots;
export default class Object extends SvelteComponentTyped<ObjectProps, ObjectEvents, ObjectSlots> {
}
export {};
