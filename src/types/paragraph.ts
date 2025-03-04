import { BlockTypes } from "./editorjs";

export interface ParagraphBlockContent {
  text: string;
}

export interface ParagraphBlock {
  type: BlockTypes.PARAGRAPH;
  data: ParagraphBlockContent;
}
