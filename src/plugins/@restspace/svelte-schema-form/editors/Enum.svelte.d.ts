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
export declare type EnumProps = typeof __propDef.props;
export declare type EnumEvents = typeof __propDef.events;
export declare type EnumSlots = typeof __propDef.slots;
export default class Enum extends SvelteComponentTyped<EnumProps, EnumEvents, EnumSlots> {
}
export {};
