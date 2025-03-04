import { BlockTypes } from "./editorjs";
export interface QuoteBlockContent {
    text: string;
    caption?: string;
    alignment?: string;
}
export interface QuoteBlock {
    type: BlockTypes.QUOTE;
    data: QuoteBlockContent;
}
