import type { Locale } from 'ckeditor5';
import { Plugin, createDropdown, ButtonView, icons } from 'ckeditor5';
import ButtonPluginFormView from './buttonPluginView.js'; // Ensure this path is correct
import ButtonPluginCommand from './buttonPluginCommand.js';
import { getButtonPluginURl, getSelectedButtonPluginViewWidget, openButtonPlugin, setButtonPluginTitle, setButtonPluginURl } from './utils.js';

// Add URL validation regex
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

const buttonPluginIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-280h480v-120H240v120Zm-80 120q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/></svg>';
const buttonPluginOpenIcon = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" ><path fill="dark" d="M9.60038 3.66557C9.34265 3.66557 9.13372 3.45664 9.13372 3.19891C9.13372 2.94117 9.34265 2.73224 9.60038 2.73224H12.8011C12.9237 2.73224 13.0352 2.77948 13.1184 2.85674C13.1273 2.86499 13.1359 2.87358 13.1441 2.88249C13.1808 2.92214 13.2092 2.9666 13.2296 3.01373C13.2542 3.0705 13.2678 3.13311 13.2678 3.19891V6.39963C13.2678 6.65736 13.0588 6.8663 12.8011 6.8663C12.5434 6.8663 12.3344 6.65736 12.3344 6.39963V4.32553L7.26309 9.39688C7.08085 9.57913 6.78537 9.57913 6.60312 9.39688C6.42088 9.21464 6.42088 8.91916 6.60312 8.73692L11.6745 3.66557H9.60038Z"/><path fill="dark" d="M4.26584 5.26593C4.10665 5.26593 3.95398 5.32917 3.84141 5.44174C3.72884 5.55431 3.6656 5.70698 3.6656 5.86618V11.7342C3.6656 11.8934 3.72884 12.046 3.84141 12.1586C3.95398 12.2712 4.10665 12.3344 4.26584 12.3344H10.1338C10.293 12.3344 10.4457 12.2712 10.5583 12.1586C10.6708 12.046 10.7341 11.8934 10.7341 11.7342V8.53345C10.7341 8.27571 10.943 8.06678 11.2007 8.06678C11.4585 8.06678 11.6674 8.27571 11.6674 8.53345V11.7342C11.6674 12.1409 11.5058 12.531 11.2182 12.8186C10.9306 13.1062 10.5406 13.2677 10.1338 13.2677H4.26584C3.85911 13.2677 3.46904 13.1062 3.18144 12.8186C2.89384 12.531 2.73227 12.1409 2.73227 11.7342V5.86618C2.73227 5.45945 2.89384 5.06938 3.18144 4.78177C3.46904 4.49417 3.85911 4.3326 4.26584 4.3326H7.46657C7.7243 4.3326 7.93324 4.54153 7.93324 4.79927C7.93324 5.057 7.7243 5.26593 7.46657 5.26593H4.26584Z"/></svg>';

export default class ButtonPluginUI extends Plugin {
    public actionsView: null = null;

    static get requires() {
    	return [ ButtonPluginCommand ];
    }

    static get pluginName() {
    	return 'ButtonPluginUI';
    }

    init() {
    	const editor = this.editor;

    	// Update the buttonPluginURl when the selection changes in the editor
    	editor.model.document.selection.on( 'change:range', () => {
    		const viewSelection = editor.editing.view.document.selection;
    		const selectedWidget = getSelectedButtonPluginViewWidget( viewSelection );

    		if ( selectedWidget && selectedWidget.hasAttribute( 'data-href' ) ) {
    			setButtonPluginURl( selectedWidget.getAttribute( 'data-href' ) || '' );
    		} else {
    			setButtonPluginURl( '' ); // Reset the linkURl if no widget is selected
    		}

    		if ( selectedWidget && selectedWidget.hasAttribute( 'data-title' ) ) {
    			setButtonPluginTitle( selectedWidget.getAttribute( 'data-title' ) || '' );
    		} else {
    			setButtonPluginTitle( '' ); // Reset the title if no widget is selected
    		}
    	} );

    	// Add the openButtonPlugin button to the widget toolbar
    	editor.ui.componentFactory.add( 'openButtonPlugin', locale => {
    		const button = new ButtonView( locale );

    		button.set( {
    			label: 'Ouvrir le lien',
    			icon: buttonPluginOpenIcon,
    			tooltip: true
    		} );

    		button.on( 'execute', () => {
    			const href = getButtonPluginURl();
    			if ( href ) {
    				openButtonPlugin( href );
    			} else {
    				alert( 'Aucun lien n\'a été fourni.' );
    			}
    		} );

    		return button;
    	} );

    	editor.ui.componentFactory.add( 'buttonPlugin', ( locale: Locale ) => {
    		const dropdown = createDropdown( locale );
    		const button = dropdown.buttonView;

    		button.set( {
    			label: 'Coller l\'URL d\'un lien',
    			icon: buttonPluginIcon,
    			tooltip: true
    		} );

    		dropdown.on( 'change:isOpen', () => {
    			const formView = new ButtonPluginFormView( locale );

    			if ( !dropdown.panelView.children.length ) {
    				dropdown.panelView.children.add( formView );
    			}

    			formView.on( 'submit', () => {
    				const element = formView.urlInputView.fieldView.element!;
    				const titleElement = formView.titleInputView.fieldView.element!;
    				const href = element instanceof HTMLInputElement ? element.value.trim() : '';
    				const titleValue = titleElement instanceof HTMLInputElement ? titleElement.value.trim() : '';

    				// Validate inputs
    				let errorMessage = '';

    				if ( !href ) {
    					errorMessage = 'L\'URL est requise.';
    				} else if ( !URL_REGEX.test( href ) ) {
    					errorMessage = 'L\'URL n\'est pas valide. Elle doit commencer par http:// ou https:// et contenir un nom de domaine valide.';
    				}

    				if ( !titleValue ) {
    					errorMessage = errorMessage ? `${ errorMessage }\nLe titre est requis.` : 'Le titre est requis.';
    				}

    				// Show error if validation fails
    				if ( errorMessage ) {
    					// Update error messages in form view
    					if ( formView.urlInputView.fieldView.element ) {
    						formView.urlInputView.errorText = !href || !URL_REGEX.test( href ) ? errorMessage : '';
    					}
    					if ( formView.titleInputView.fieldView.element ) {
    						formView.titleInputView.errorText = !titleValue ? 'Le titre est requis.' : '';
    					}
    					return;
    				}

    				// Clear any previous error messages
    				formView.urlInputView.errorText = '';
    				formView.titleInputView.errorText = '';

    				// If validation passes, execute the command
    				editor.execute( 'insertButtonPlugin', { href, title: titleValue } );
    				dropdown.isOpen = false;
    				editor.editing.view.focus();

    				// Reset form fields
    				if ( formView.urlInputView.fieldView.element instanceof HTMLInputElement ) {
    					formView.urlInputView.fieldView.element.value = '';
    				}
    				if ( formView.titleInputView.fieldView.element instanceof HTMLInputElement ) {
    					formView.titleInputView.fieldView.element.value = '';
    				}

    				// Update stored values
    				setButtonPluginURl( href );
    				setButtonPluginTitle( titleValue );
    			} );

    			formView.on( 'cancel', () => {
    				// Clear any error messages when canceling
    				formView.urlInputView.errorText = '';
    				formView.titleInputView.errorText = '';

    				dropdown.isOpen = false;
    				editor.editing.view.focus();
    			} );
    		} );

    		return dropdown;
    	} );

    	editor.commands.add( 'insertButtonPlugin', new ButtonPluginCommand( editor ) );
    }
}
