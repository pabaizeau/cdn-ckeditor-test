export declare enum BlockTypes {
    HEADER2 = "headerH2",
    HEADER3 = "headerH3",
    PARAGRAPH = "paragraph",
    ORDERED_LIST = "orderedList",
    UNORDERED_LIST = "unorderedList",
    IMAGE = "image",
    TABLE = "table",
    LINK_TOOL = "linkTool",
    QUOTE = "quote",
    HIGHLIGHT = "highlight",
    EMBED = "embed",
    IMAGE_CONTAINER = "imageContainer",
    BUTTON = "buttonPlugin"
}
export type Block = {
    type: string;
    data: {
        content?: string[][];
        text?: string;
        level?: number;
        items?: Array<string>;
        style?: string;
        variant?: string;
        description?: string;
        title?: string;
    };
};
export interface RichTextObject {
    time?: number;
    version: string;
    blocks: Block[];
}
