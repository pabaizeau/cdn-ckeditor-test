import type { ViewElement, // ADDED
ViewDocumentSelection } from 'ckeditor5';
/**
 * Returns an buttonPlugin widget editing view element if one is selected or is among the selection's ancestors.
 */
export declare const getSelectedButtonPluginViewWidget: (selection: ViewDocumentSelection) => ViewElement | null;
/**
* Checks if a given view element is an buttonPlugin widget.
*/
export declare const isButtonPluginWidget: (viewElement: ViewElement) => boolean;
/**
 * Opens the link in a new browser tab.
 */
export declare function openButtonPlugin(link: string): void;
/**
 * Returns the URL of the selected buttonPlugin widget.
 * @returns The URL of the selected buttonPlugin widget.
 */
export declare function getButtonPluginURl(): string | undefined;
/**
 * Sets the URL of the selected buttonPlugin widget.
 * @param url The URL of the selected buttonPlugin widget.
 */
export declare function setButtonPluginURl(url: string): void;
/**
 * Returns the title of the selected buttonPlugin widget.
 * @returns The title of the selected buttonPlugin widget.
 */
export declare function getButtonPluginTitle(): string | undefined;
/**
 * Sets the title of the selected buttonPlugin widget.
 * @param title The title of the selected buttonPlugin widget.
 */
export declare function setButtonPluginTitle(title: string): void;
