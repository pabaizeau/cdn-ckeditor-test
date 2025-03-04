import {
    ViewElement,
    Element,
    ViewDocumentSelection,
    isWidget,Writer,
    DocumentSelection
} from 'ckeditor5';
import { highlights } from './assets/highlightVariant';

/**
 * Returns an highlight widget editing view element if one is selected or is among the selection's ancestors.
 */
export const getSelectedHighlightViewWidget = (selection: ViewDocumentSelection): ViewElement | null => {
    const viewElement = selection.getSelectedElement();

    if (!viewElement) {
        return null;
    }

    if (isHighlightWidget(viewElement)) {
        return viewElement;
    }
    return null;
}

/**
* Checks if a given view element is an highlight widget.
*/
export const isHighlightWidget = (viewElement: ViewElement): boolean => {
    const isHighlight = viewElement.hasClass('ck-highlight');
    return isHighlight && isWidget(viewElement);
}

function extractContentFromElement(element: Element | null): Array<{ data?: string, attributes?: Iterable<[string, string]> } | { type: 'break' }> {
    if (!element) {
        return [];
    }

    return Array.from(element.getChildren()).reduce<Array<{ data?: string, attributes?: Iterable<[string, string]> } | { type: 'break' }>>((acc, child) => {
        if (child.is('$text') || child.is('$textProxy')) {
            acc.push({ data: child.data, attributes: child.getAttributes() as Iterable<[string, string]> });
        } else if (child.is('element') && child.name === 'br') {
            acc.push({ type: 'break' });
        }
        return acc;
    }, []);
}

export const getValuesFromHighlightBox = (selectedElement: Element | null) => {
    if (!selectedElement || selectedElement.name !== 'highlightBox') {
        return null;
    }

    const titleChild = Array.from(selectedElement.getChildren())[0];
    const descriptionChild = Array.from(selectedElement.getChildren())[1];

    const titleContent = extractContentFromElement(titleChild as Element);
    const descriptionContent = extractContentFromElement(descriptionChild as Element);

    return {
        title: titleContent,
        description: descriptionContent
    };
}

export function createHighlightBox(writer: Writer, selection: DocumentSelection, value: string) {
    const highlightBox = writer.createElement('highlightBox', { variant: value });
    const highlightTitle = writer.createElement('highlightBoxTitle');
    const highlightDescription = writer.createElement('highlightBoxDescription');

    const { titleContent, descriptionContent } = getContentForHighlightBox(selection, value);

    // Insert title content
    appendTextNodes(writer, highlightTitle, titleContent);

    // Insert description content
    appendTextNodes(writer, highlightDescription, descriptionContent);

    writer.append(highlightTitle, highlightBox);
    writer.append(highlightDescription, highlightBox);

    return highlightBox;
}

// Helper function to extract the title and description content
function getContentForHighlightBox(selection: DocumentSelection, value: string) {
    const values = getValuesFromHighlightBox(selection.getSelectedElement());
    const titleContent = values?.title || [{ data: highlights[value].title, attributes: [] }];
    const descriptionContent = values?.description || [];

    return { titleContent, descriptionContent };
}

// Helper function to append text nodes to an element
function appendTextNodes(writer: Writer, parentElement: any, content: any[]) {
    content.forEach(node => {
        if (node) {
            if (node.type === 'break') {
                // Insert a line break element if the node is of type 'break'
                const breakElement = writer.createElement('br');
                writer.append(breakElement, parentElement);
            } else if (node.data) {
                // Insert a text node if the node has data
                const textNode = writer.createText(node.data, Object.fromEntries(node.attributes || []));
                writer.append(textNode, parentElement);
            }
        }
    });
}