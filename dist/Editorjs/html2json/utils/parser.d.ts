import { RichTextObject } from '../../../types';
type Parser = {
    parse(html: string): RichTextObject;
};
declare const createParser: (plugins?: {}) => Parser;
export default createParser;
