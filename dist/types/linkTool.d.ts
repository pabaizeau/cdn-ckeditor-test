import { BlockTypes } from "./editorjs";
export interface LinkToolBlockContent {
    link: string;
    meta: {
        id: string;
        title: string;
        image?: {
            url?: string;
        };
    };
}
export interface LinkToolBlock {
    type: BlockTypes.LINK_TOOL;
    data: LinkToolBlockContent;
}
export interface Partner {
    image: string;
    regex: string;
}
export interface LinkToolResponse {
    href: string;
    id: string;
    title: string;
    imageUrl: string;
    link: string | undefined;
}
