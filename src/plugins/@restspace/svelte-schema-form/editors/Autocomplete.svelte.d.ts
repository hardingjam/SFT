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
export declare type AutocompleteProps = typeof __propDef.props;
export declare type AutocompleteEvents = typeof __propDef.events;
export declare type AutocompleteSlots = typeof __propDef.slots;
export default class Autocomplete extends SvelteComponentTyped<AutocompleteProps, AutocompleteEvents, AutocompleteSlots> {
}
export {};
