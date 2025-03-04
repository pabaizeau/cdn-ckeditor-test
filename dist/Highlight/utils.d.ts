import { ViewElement, Element, ViewDocumentSelection, Writer, DocumentSelection } from 'ckeditor5';
/**
 * Returns an highlight widget editing view element if one is selected or is among the selection's ancestors.
 */
export declare const getSelectedHighlightViewWidget: (selection: ViewDocumentSelection) => ViewElement | null;
/**
* Checks if a given view element is an highlight widget.
*/
export declare const isHighlightWidget: (viewElement: ViewElement) => boolean;
export declare const getValuesFromHighlightBox: (selectedElement: Element | null) => {
    title: ({
        data?: string | undefined;
        attributes?: Iterable<[string, string]> | undefined;
    } | {
        type: 'break';
    })[];
    description: ({
        data?: string | undefined;
        attributes?: Iterable<[string, string]> | undefined;
    } | {
        type: 'break';
    })[];
} | null;
export declare function createHighlightBox(writer: Writer, selection: DocumentSelection, value: string): Element;
