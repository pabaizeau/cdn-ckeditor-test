/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/**
 * @module editorjs/editorjsdataprocessor
 */
import { HtmlDataProcessor, type DataProcessor, type ViewDocument, type ViewDocumentFragment, type MatcherPattern } from 'ckeditor5';
/**
 * This data processor implementation uses GitHub Flavored Json as input/output data.
 *
 * See the {@glink features/editorjs Json output} guide to learn more on how to enable it.
 */
export default class EditorjsDataProcessor implements DataProcessor {
    /**
     * HTML data processor used to process HTML produced by the Json-to-HTML converter and the other way.
     */
    _htmlDP: HtmlDataProcessor;
    /**
     * Creates a new instance of the Json data processor class.
     */
    constructor(document: ViewDocument);
    /**
     * Keeps the specified element in the output as HTML. This is useful if the editor contains
     * features producing HTML that is not a part of the Json standard.
     *
     * By default, all HTML tags are removed.
     *
     * @param element The element name to be kept.
     */
    /**
     * Converts the provided JSON string to a view tree.
     *
     * @param data A JSON string.
     * @returns The converted view element.
     */
    toView(data: string): ViewDocumentFragment;
    /**
     * Converts the provided {@link module:engine/view/documentfragment~DocumentFragment} to data format &ndash; in this
     * case to a JSON string.
     *
     * @returns JSON string.
     */
    toData(viewFragment: ViewDocumentFragment): string;
    /**
     * Registers a {@link module:engine/view/matcher~MatcherPattern} for view elements whose content should be treated as raw data
     * and not processed during the conversion from Json to view elements.
     *
     * The raw data can be later accessed by a
     * {@link module:engine/view/element~Element#getCustomProperty custom property of a view element} called `"$rawContent"`.
     *
     * @param pattern The pattern matching all view elements whose content should
     * be treated as raw data.
     */
    registerRawContentMatcher(pattern: MatcherPattern): void;
    /**
     * This method does not have any effect on the data processor result. It exists for compatibility with the
     * {@link module:engine/dataprocessor/dataprocessor~DataProcessor `DataProcessor` interface}.
     */
    useFillerType(): void;
}
