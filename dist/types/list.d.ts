import { BlockTypes } from "./editorjs";
export declare enum ListStyle {
    ORDERED = "ordered",
    UNORDERED = "unordered"
}
export interface ListBlockContent {
    style: ListStyle;
    items: string[];
}
export interface ListBlock {
    type: BlockTypes.ORDERED_LIST | BlockTypes.UNORDERED_LIST;
    data: ListBlockContent;
}
