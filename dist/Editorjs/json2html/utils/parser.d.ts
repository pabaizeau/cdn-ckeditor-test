import { RichTextObject } from "../../../types/index.js";
type parser = {
    parse(OutputData: RichTextObject): Array<string>;
};
declare const parser: (plugins?: {}) => parser;
export default parser;
