import { BlockTypes } from "./editorjs.js";
export interface ButtonPluginContent {
    title: string;
    href: string;
}
export interface ButtonPluginBlock {
    type: BlockTypes.BUTTON;
    data: ButtonPluginContent;
}
export interface ButtonPluginResponse {
    href: string;
    title: string;
}
