import { BlockTypes } from "./editorjs";
export interface HeaderBlockContent {
    text: string;
    level?: number;
}
export interface HeaderBlock {
    type: BlockTypes.HEADER2 | BlockTypes.HEADER3;
    data: HeaderBlockContent;
}
