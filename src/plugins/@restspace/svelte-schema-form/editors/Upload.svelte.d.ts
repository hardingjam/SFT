import { SvelteComponentTyped } from "svelte";
import { type CommonComponentParameters } from "../types/CommonComponentParameters";
declare const __propDef: {
    props: {
        params: CommonComponentParameters;
        schema: any;
        value: any;
        highlight?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type UploadProps = typeof __propDef.props;
export declare type UploadEvents = typeof __propDef.events;
export declare type UploadSlots = typeof __propDef.slots;
export default class Upload extends SvelteComponentTyped<UploadProps, UploadEvents, UploadSlots> {
}
export {};
