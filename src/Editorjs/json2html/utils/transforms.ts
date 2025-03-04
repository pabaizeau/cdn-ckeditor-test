import {
  HeaderBlock,
  ListBlock,
  ParagraphBlock,
  TableBlock,
  LinkToolBlock,
  QuoteBlock,
  ImageBlock,
  MediaEmbedBlock,
  HighlightBlock,
  ImageContainerBlock
} from "../../../types/index.js";
import { highlights } from "../../../Highlight/assets/highlightVariant.js";
import { allProviders } from '../../../config/index.js';
import { ButtonPluginBlock } from "../../../types/buttonPlugin.js";

export type transforms = {
  [key: string]: any;
  paragraph(block: ParagraphBlock): string;
  headerH2(block: HeaderBlock): string;
  headerH3(block: HeaderBlock): string;
  unorderedList(block: ListBlock): string;
  orderedList(block: ListBlock): string;
  table(block: TableBlock): string;
  linkTool(block: LinkToolBlock): string;
  quote(block: QuoteBlock): string;
  image(block: ImageBlock): string;
  imageContainer(block: ImageContainerBlock): string;
  highlight(block: HighlightBlock): string;
  embed(block: MediaEmbedBlock): string;
  buttonPlugin(block: ButtonPluginBlock): string;
};

const transforms: transforms = {
  paragraph: ({ data }) => {
    return `<p>${data.text}</p>`;
  },
  headerH2: ({ data }) => {
    return `<h2>${data.text}</h2>`;
  },
  headerH3: ({ data }) => {
    return `<h3>${data.text}</h3>`;
  },
  mediaLib: () => {
    return "";
  },
  unorderedList: ({ data }) => {
    if (!data.items) {
      return "";
    }

    return `
      <ul>
        ${data.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
  },
  orderedList: ({ data }) => {
    if (!data.items) {
      return "";
    }

    return `
      <ol>
        ${data.items.map((item) => `<li>${item}</li>`).join("")}
      </ol>
    `;
  },
  table: ({ data }) => {
    if (!data.content) {
      return "";
    }

    return `
      <figure class="table" contenteditable="false">
        <table>
          ${data.withHeadings ? (
            `<thead>
              <tr>
                ${data.content[0]
                  .map(
                    (cell: string) => `
                    <th contenteditable="true">
                      <span>${cell}</span>
                    </th>
                  `
                  )
                  .join("")}
              </tr>
            </thead>
            `
          ) : ""}
          <tbody>
            ${data.content.slice(data.withHeadings ? 1 : 0)
              .map(
                (row: string[]) => `
                <tr>
                  ${row
                    .map(
                      (cell: string) => `
                      <td contenteditable="true">
                        <span>${cell}</span>
                      </td>
                    `
                    )
                    .join("")}
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      </figure>
    `;
  },
  imageContainer: ({ data }) => {
    if (!data.children?.length) {
      return "";
    }
    return `<figure class="images-container">${data.children.map((child: ImageBlock) => {
      const { file, caption } = child.data;
      return `<figure
        class="image"
        contenteditable="false">
        <img src="${file.url}" alt="${file.alt}">
        <figcaption contenteditable="true">${caption}</figcaption>
      </figure>`;
    }).join('')}</figure>`;
  },
  image: ({ data }) => {
    const { file, caption, stretched } = data;
    return `
      <figure
        class="image"
        data-stretched="${!!stretched}"
        ${!!stretched ? 'style="width:70%; margin: 0 auto; display: block; text-align: center;"' : ''}
        contenteditable="false">
        <img src="${file.url}" alt="${file.alt}">
        <figcaption contenteditable="true">${caption}</figcaption>
      </figure>
    `;
  },
  linkTool: ({ data }) => {
    const { link, meta } = data;
    const imageUrl =  meta.image ? meta.image.url : 'https://placehold.co/80x80';
    return `
      <figure class="link-tool"
        data-id="${meta.id}"
        data-href="${link}"
        data-title="${meta.title}"
        data-image-url="${imageUrl}"
        contenteditable="false">
          <div class="link-tool-container">
              <a class="link-tool-content" href="${link}" data-id="${meta.id}" target="_blank" rel="nofollow noindex noreferrer">
                  <div class="link-tool-image" style="background-image: url('${imageUrl}');" >
                  </div>
                  <div class="link-tool-title">${meta.title}</div>
                  <div class="link-tool-anchor">${link}</div>
              </a>
          </div>
      </figure>
    `;
  },
  quote: ({ data }) => {
    return `
      <figure class="quote">
        <p class="quote__content">${data.text}</p>
        <figcaption class="quote__caption">${data.caption ?? ''}</figcaption>
      </figure>
    `;
  },
  highlight: ({ data }) => {
    const {variant, title, description} = data;

    return `
    <figure class="ck-highlight ck-highlight-${variant}" data-variant=${variant}>
        <div class="ck-highlight__title">
          ${title}
        </div>
        <div class="ck-highlight__description" contenteditable="true">
          ${description}
        </div>
        <div class="ck-iconWrapper">
          <div class="ck-iconHighlight">
            ${highlights[variant].icon}
          </div>
      </div>
   </figure>`;
  },
  // TODO: add caption to media embed <figcaption class="media-embed__caption">${data.caption || ''}</figcaption>
  embed: ({ data }) => {
    const regex = allProviders[data.service].url;
    const match = RegExp(regex).exec(data.source);
    return `
      <figure class="media">
        <div class="ck-media__wrapper" data-oembed-url="${data.source}" data-caption="${data.caption}">
          ${allProviders[data.service].html(match)}
        </div>
      </figure>

    `;
  },

  buttonPlugin: ({ data }) => {
    const { href, title } = data;
    return `
      <figure class="button-plugin"
        data-href="${href}"
        data-title="${title}"
        contenteditable="false">
          <div class="button-plugin-tool-container">
              <a class="button-plugin-tool-content" href="${href}" target="_blank" rel="nofollow noindex noreferrer">
                  <div class="button-plugin-tool-title">${title}</div>
                  <div class="button-plugin-tool-anchor">${href}</div>
              </a>
          </div>
      </figure>
    `;
  },

};

export default transforms;
