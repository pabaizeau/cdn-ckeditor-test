import { BlockTypes } from "./editorjs";

export enum VariantTypes {
    INFO = "info",
    PARKING = "parking",
    SPOT = "spot",
    FAVORITE = "favorite",
    ACTION = "action",
    TIP = "tip",
    HOUSING = "housing",
    RESTAURANT = "restaurant",
    ACITIVITY = "activity",
  }

export interface HighlightBlockContent {
    title: string;
    description: string;
    variant: VariantTypes;
  }
  
  export interface HighlightBlock {
    type: BlockTypes.HIGHLIGHT;
    data: HighlightBlockContent;
  }