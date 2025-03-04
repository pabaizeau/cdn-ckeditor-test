import type { Locale } from 'ckeditor5';
import { icons, View, LabeledFieldView, createLabeledInputText, ButtonView, submitHandler } from 'ckeditor5';
import './buttonPlugin.css';

export default class ButtonPluginFormView extends View {
    urlInputView: LabeledFieldView;
    titleInputView: LabeledFieldView;
    saveButtonView: ButtonView;
    cancelButtonView: ButtonView;
    childViews: any;
    constructor( locale: Locale ) {
    	super( locale );

    	// URL input field
    	this.urlInputView = this._createInput( 'URL' );

    	// Title input field
    	this.titleInputView = this._createInput( 'Titre' );

    	// Save button
    	this.saveButtonView = this._createButton( 'Enregistrer', icons.check, 'ck-button-save' );
    	this.saveButtonView.type = 'submit';

    	// Cancel button
    	this.cancelButtonView = this._createButton( 'Annuler', icons.cancel, 'ck-button-cancel' );
    	this.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );

    	// Collecting child views
    	this.childViews = this.createCollection( [
    		this.urlInputView,
    		this.titleInputView,
    		this.cancelButtonView,
    		this.saveButtonView
    	] );

    	// Setting the template
    	this.setTemplate( {
    		tag: 'form',
    		attributes: {
    			class: [ 'ck', 'ck-button-plugin-form' ],
    			tabindex: '-1'
    		},
    		children: this.childViews
    	} );
    }

    override render() {
    	super.render();
    	submitHandler( {
    		view: this
    	} );
    }

    focus() {
    	this.childViews.first.focus();
    }

    _createInput( label: string ) {
    	const labeledInput = new LabeledFieldView( this.locale, createLabeledInputText );
    	labeledInput.label = label;
    	return labeledInput;
    }

    _createButton( label: string, icon: string, className: string ) {
    	const button = new ButtonView( this.locale );
    	button.set( {
    		label,
    		icon,
    		tooltip: true,
    		class: className
    	} );
    	return button;
    }
}
