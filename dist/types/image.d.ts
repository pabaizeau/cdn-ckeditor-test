import { BlockTypes } from "./editorjs";
export interface StrapiImage {
    url: string;
    alternativeText: string;
    width: number;
    stretched?: boolean;
    height: number;
    fileName: string;
    format?: string;
}
export interface ImageBlockContent {
    file: {
        url: string;
        alt: string;
    };
    caption: string;
    withBorder?: boolean;
    stretched?: boolean;
    withBackground?: boolean;
}
export interface ImageBlock {
    type: BlockTypes.IMAGE;
    data: ImageBlockContent;
}
export interface ImageContainerBlock {
    type: BlockTypes.IMAGE_CONTAINER;
    data: {
        children: ImageBlock[];
    };
}
