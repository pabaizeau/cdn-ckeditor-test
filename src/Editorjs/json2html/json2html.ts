/**
 * @module editorjs/json2html/json2html
 */

import edjsParser from "./utils/parser";
/**
 * Parses editorjs string to an HTML.
 */
export default function json2html(data: string) {
  try {
    if (!data) {
      return data;
    }
    const parsedJson = JSON.parse(data);
    const edjs = edjsParser();
    const html = edjs.parse(parsedJson);
    return html.join("");
  } catch (e) {
    console.log({ e });
    return data;
  }
}
