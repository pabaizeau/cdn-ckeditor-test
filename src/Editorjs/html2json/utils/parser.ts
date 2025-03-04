// Import the necessary Cheerio function
import { load } from 'cheerio';
import { Element } from 'domhandler';
import transforms from './transforms';
import { Block, RichTextObject } from '../../../types'; // Adjust the import path as needed
import { ParseFunctionError } from './errors';

type Parser = {
  parse(html: string): RichTextObject;
};

const createParser = (plugins = {}): Parser => {
  const parsers = Object.assign({}, transforms, plugins);

  return {
    parse: (html: string): RichTextObject => {
      const $ = load(html); // Load the HTML string into Cheerio
      const blocks: Block[] = [];
      $('article').children().each((i: number, element: Element) => {
        let tagName = element.tagName.toLowerCase();
        let transformFn = parsers[tagName];
        // figure tag is a special case for table, image, and media embed
        if (tagName === 'figure' && element.attribs.class) {
          const classList = element.attribs.class.split(' ');
          const foundClass = classList.find(className => parsers[className]);
          if (foundClass) {
            transformFn = parsers[foundClass];
          }
        }

        if (transformFn) {
          // Pass the Cheerio object representing the element to the transform function
          blocks.push(transformFn($(element)));
        } else {
          console.error(ParseFunctionError(tagName));
        }
      });

      return {
        blocks: blocks,
        version: "1.0.0"
      };
    },
  };
};

export default createParser;
