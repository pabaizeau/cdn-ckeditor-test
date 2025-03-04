import { BlockTypes } from "./editorjs";

export enum ListStyle {
  ORDERED = "ordered",
  UNORDERED = "unordered",
}

export interface ListBlockContent {
  style: ListStyle;
  items: string[];
}

export interface ListBlock {
  type: BlockTypes.ORDERED_LIST | BlockTypes.UNORDERED_LIST;
  data: ListBlockContent;
}
