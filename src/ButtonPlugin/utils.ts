import type {
	ViewElement,	// ADDED
	ViewDocumentSelection } from 'ckeditor5';
import {
	Element,
	toMap
} from 'ckeditor5';
import { isWidget } from 'ckeditor5';

/**
 * Returns an buttonPlugin widget editing view element if one is selected or is among the selection's ancestors.
 */
export const getSelectedButtonPluginViewWidget = ( selection: ViewDocumentSelection ): ViewElement | null => {
	const viewElement = selection.getSelectedElement();

	if ( !viewElement ) {
		return null;
	}

	if ( isButtonPluginWidget( viewElement ) ) {
		if ( viewElement.hasAttribute( 'data-href' ) ) {
			buttonPluginURl = viewElement.getAttribute( 'data-href' );
		}

		return viewElement;
	}
	return null;
};

/**
* Checks if a given view element is an buttonPlugin widget.
*/
export const isButtonPluginWidget = ( viewElement: ViewElement ): boolean => {
	const isButtonPlugin = viewElement.hasClass( 'button-plugin' );
	return isButtonPlugin && isWidget( viewElement );
};

/**
 * Opens the link in a new browser tab.
 */
export function openButtonPlugin( link: string ): void {
	window.open( link, '_blank', 'noopener' );
}

/**
 * The URL of the selected buttonPlugin widget.
 */
let buttonPluginURl: string | undefined = '';

/**
 * Returns the URL of the selected buttonPlugin widget.
 * @returns The URL of the selected buttonPlugin widget.
 */
export function getButtonPluginURl(): string | undefined {
	return buttonPluginURl;
}

/**
 * Sets the URL of the selected buttonPlugin widget.
 * @param url The URL of the selected buttonPlugin widget.
 */
export function setButtonPluginURl( url: string ): void {
	buttonPluginURl = url;
}

/**
 * The title of the selected buttonPlugin widget.
 */
let buttonPluginTitle: string | undefined = '';

/**
 * Returns the title of the selected buttonPlugin widget.
 * @returns The title of the selected buttonPlugin widget.
 */
export function getButtonPluginTitle(): string | undefined {
	return buttonPluginTitle;
}

/**
 * Sets the title of the selected buttonPlugin widget.
 * @param title The title of the selected buttonPlugin widget.
 */
export function setButtonPluginTitle( title: string ): void {
	buttonPluginTitle = title;
}
