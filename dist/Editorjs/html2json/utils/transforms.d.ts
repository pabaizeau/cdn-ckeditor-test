import { Cheerio } from "cheerio";
import { Element } from 'domhandler';
export type TransformFunctions = {
    [key: string]: (element: Cheerio<Element>) => any;
};
declare const transforms: TransformFunctions;
export default transforms;
