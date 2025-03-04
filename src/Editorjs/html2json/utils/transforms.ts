// transforms.ts
import { ImageBlock } from "../../../types/index.js";
import { BlockTypes } from "../../../types/editorjs.js";
import { Cheerio } from "cheerio";
import { Element } from 'domhandler';

export type TransformFunctions = {
  [key: string]: (element: Cheerio<Element>) => any;
};

const transforms: TransformFunctions = {
  p: (element: Cheerio<Element>) => ({
    type: "paragraph",
    data: { text: element.html() },
  }),
  h2: (element: Cheerio<Element>) => ({
    type: "headerH2",
    data: { text: element.text(), level: 2 },
  }),
  h3: (element: Cheerio<Element>) => ({
    type: "headerH3",
    data: { text: element.text(), level: 3 },
  }),

  ul: (element: Cheerio<Element>) => ({
    type: "unorderedList",
    data: {
      items: element
        .find("li")
        .map((i: number, el: Element) => {
          return element.find(el).html();
        })
        .get(),
      style: "unordered",
    },
  }),
  ol: (element: Cheerio<Element>) => ({
    type: "orderedList",
    data: {
      items: element
        .find("li")
        .map((i: number, el: Element) => {
          return element.find(el).html();
        })
        .get(),
      style: "ordered",
    },
  }),
  "ck-highlight": (element: Cheerio<Element>) => {
    return {
      type: "highlight",
      data: {
        variant: element.attr("data-variant"),
        description: element.find(".ck-highlight__description").html(),
        title: element.find("div").html(),
      },
    };
  },
  table: (element: Cheerio<Element>) => ({
    type: "table",
    data: {
      // check if the table has a thead
      withHeadings: element.find("thead").length > 0,
      content: element
        .find("tr")
        .map((i: number, el: Element) => {
          return element
            .find(el)
            .find("td, th")
            .map((i: number, el: Element) => {
              const content = element.find(el)
              return content.html();
            })
            .get();
        })
        .get()
        .reduce((acc: string[][], item: string, index: number) => {
          const nbCols = element.find("tr").first().find("td, th").length;
          if (index % nbCols === 0) acc.push([item]);
          else acc[acc.length - 1].push(item);
          return acc;
        }, [])
    },
  }),
  image: (element: Cheerio<Element>) => ({
    type: "image",
    data: {
      file: {
        url: element.find("img").attr("src"),
        alt: element.find("img").attr("alt"),
      },
      caption: element.find("figcaption").text(),
      withBorder: false,
      stretched: !!element.attr("style")?.includes("width"),
      withBackground: false,
    },
  }),
  'images-container': (element: Cheerio<Element>) => ({
  type: "imageContainer",
  data: {
    children: element.find("figure.image").map((i: number, el: Element): ImageBlock => ({
      type: BlockTypes.IMAGE,
      data: {
        file: {
          url: element.find(el).find("img").attr("src") ?? "",
          alt: element.find(el).find("img").attr("alt") ?? "",
        },
        caption: element.find(el).find("figcaption").text(),
      }
    })).get()
  },
}),
  'link-tool': (element: Cheerio<Element>) => ({
    type: "linkTool",
    data: {
      link: element.attr("data-href"),
      meta: {
        id: element.attr("data-id"),
        title: element.attr("data-title"),
        image: {
          url: element.attr("data-image-url"),
        },
      },
    },
  }),
  quote: (element: Cheerio<Element>) => ({
    type: "quote",
    data: {
      text: element.find("p").html(),
      // TODO: (Should be improved) the ckeditor quote add a &nbsp; in the caption, we have to remove it
      caption: element.find("figcaption").text() !== "\u00a0" ? element.find("figcaption").html(): "",
    },
  }),
  media: (element: Cheerio<Element>) => {
      const source = element.children().first().attr("data-oembed-url");
      const iframe = element.find("iframe");
      const service = iframe.attr("title");
      const embed = iframe.attr("src");
      const width = iframe.attr("width") ?? 0;
      const height = iframe.attr("height") ?? 0;
      return {
        type: "embed",
        data: {
          embed,
          service,
          source,
          width: +width,
          height: +height,
          caption: element.find("figcaption").text() !== "\u00a0" ? element.find("figcaption").html(): "",
        },
      };
  },

  'button-plugin': (element: Cheerio<Element>) => {
    return {
      type: "buttonPlugin",
      data: {
        href: element.attr("data-href"),
        title: element.attr("data-title"),
      },
    };
  },
};

export default transforms;
