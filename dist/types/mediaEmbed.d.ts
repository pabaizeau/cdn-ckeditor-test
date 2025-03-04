import { BlockTypes } from "./editorjs";
export interface MediaEmbedBlockContent {
    caption?: string;
    embed: string;
    service: string;
    source: string;
    width: number;
    height: number;
}
export interface MediaEmbedBlock {
    type: BlockTypes.EMBED;
    data: MediaEmbedBlockContent;
}
