import transforms from "./transforms.js";
import { ParseFunctionError } from "./errors.js";
import { RichTextObject } from "../../../types/index.js";

type parser = {
  parse(OutputData: RichTextObject): Array<string>;
};

const parser = (plugins = {}): parser => {
  const parsers = Object.assign({}, transforms, plugins);

  return {
    parse: ({ blocks }) => {
      return blocks.map((block) => {
        return parsers[block.type]
          ? parsers[block.type](block)
          : ParseFunctionError(block.type);
      });
    },
  };
};

export default parser;
