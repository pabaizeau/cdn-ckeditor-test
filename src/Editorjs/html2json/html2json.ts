
import createParser from "./utils/parser";

/**
 * Parses HTML to a json.
 */
export default function json2html(html: string): string {
  try {
    if (!html) {
      return JSON.stringify({
        blocks: [],
        version: "1.0.0"
      });
    }
    const data = createParser().parse(`<article>${html}</article>`);
    const jsonString = JSON.stringify(data);
    return jsonString;

  } catch (e) {
    console.error(e);
    return JSON.stringify({
      blocks: [],
      version: "1.0.0"
    });
  }
}
