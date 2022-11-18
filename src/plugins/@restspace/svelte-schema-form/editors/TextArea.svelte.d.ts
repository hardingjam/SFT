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
export declare type TextAreaProps = typeof __propDef.props;
export declare type TextAreaEvents = typeof __propDef.events;
export declare type TextAreaSlots = typeof __propDef.slots;
export default class TextArea extends SvelteComponentTyped<TextAreaProps, TextAreaEvents, TextAreaSlots> {
}
export {};
