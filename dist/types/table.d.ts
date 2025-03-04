import { BlockTypes } from "./editorjs";
export interface TableBlockContent {
    withHeadings?: boolean;
    content: string[][];
}
export interface TableBlock {
    type: BlockTypes.TABLE;
    data: TableBlockContent;
}
