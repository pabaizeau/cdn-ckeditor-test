import { Plugin } from 'ckeditor5';
import { Widget, toWidget, toWidgetEditable } from 'ckeditor5';
import { Enter, ViewDocumentEnterEvent } from 'ckeditor5';
import InsertHighlightCommand from './InsertHighlightCommand';
import { highlights } from './assets/highlightVariant';


export default class HighlightEditing extends Plugin {
    static get requires() {                                                   
        return [Widget, Enter];
    }
    public static get pluginName() {
		return 'HighlightEditing' as const;
	}

    init() {
        this._defineSchema();
        this._defineConverters();
        this._defineBrConverters();
        this.editor.commands.add('insertHighlightBox', new InsertHighlightCommand(this.editor));

        this.editor.config.define('highlightConfig', {                          
            types: Object.keys(highlights)
        });
        this._setupEnterKeyHandling();
    }

    _setupEnterKeyHandling() {
        this.listenTo<ViewDocumentEnterEvent>(this.editor.editing.view.document, 'enter', (evt, data) => {
            const positionParent = this.editor.model.document.selection.getLastPosition()?.parent;
            if (!positionParent) {
                return;
            }
            if (positionParent.is('element', 'highlightBoxTitle') || positionParent.is('element', 'highlightBoxDescription')) {
                this._handleEnterInHighlightBox();
                data.preventDefault();
                evt.stop();
                this.editor.editing.view.scrollToTheSelection();
            }
        }, { priority: 'high' });
    }

    _handleEnterInHighlightBox() {
        const model = this.editor.model;
        const document = model.document;

        model.change(writer => {
            const selection = document.selection;
            const position = selection.getFirstPosition();
            if (!position) {
                return;
            }
            writer.insertElement('br', position);
        });
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register('highlightBox', {
            // Behaves like a self-contained block object (e.g. a block image)
            // allowed in places where other blocks are allowed (e.g. directly in the root).
            inheritAllFrom: '$blockObject',
            allowAttributes: ['variant']
        });

        schema.register('highlightBoxTitle', {
            // Cannot be split or left by the caret.
            isLimit: true,
            allowIn: 'highlightBox',

            // Allow content which is allowed in blocks (i.e. text with attributes).
            allowContentOf: '$block',
        });

        schema.register('highlightBoxDescription', {
            // Cannot be split or left by the caret.
            isLimit: true,
            allowIn: 'highlightBox',
            // Allow content which is allowed in the root (e.g. paragraphs).
            allowContentOf: '$block',
        });

        schema.register('br', {
            allowWhere: '$text',
            isInline: true,
            isContent: true
        });
    }

    _defineConverters() {
        const conversion = this.editor.conversion;


        // <highlightBox> converters.
        conversion.for('upcast').elementToElement({
            view: {
                name: 'figure',
                classes: `ck-highlight`,
                attributes: ['data-variant'] // Add custom class from variant
            },
            model: (viewElement, { writer: modelWriter }) => {    
                return modelWriter.createElement('highlightBox', {
                    variant: viewElement.getAttribute('data-variant'),
                });
            },

        });
        //modal to view
        conversion.for('dataDowncast').elementToElement({
            model: 'highlightBox',
            view: (modelElement, { writer: viewWriter }) => {
                const variant = modelElement.getAttribute('variant') as string;
                return viewWriter.createContainerElement('figure', { class: `ck-highlight ck-highlight-${variant}`, 'data-variant': `${variant}` });
            }
    
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'highlightBox',
            view: (modelElement, { writer: viewWriter }) => {
                const variant = modelElement.getAttribute('variant') as string;
                const iconWrapper = viewWriter.createContainerElement('div', { class: `ck-iconWrapper` });
                const icon = viewWriter.createRawElement('div', { class: `ck-iconHighlight` }, function( domElement ) {
                    domElement.innerHTML = highlights[variant].icon;
                });
               
                const section = viewWriter.createContainerElement('figure', { class: `ck-highlight ck-highlight-${variant}`,'data-variant': `${variant}`, });// Add custom class from variant

                viewWriter.insert(viewWriter.createPositionAt(section, 0), iconWrapper);
                viewWriter.insert(viewWriter.createPositionAt(iconWrapper, 0), icon);
                
                return toWidget(section, viewWriter, { label: 'highlight box widget' });
            }
        });

        // <highlightBoxTitle> converters.
        conversion.for('upcast').elementToElement({
            model: 'highlightBoxTitle',
            view: {
                name: 'div',
                classes: 'ck-highlight__title',
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'highlightBoxTitle',
            view: {
                name: 'div',
                classes: 'ck-highlight__title'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'highlightBoxTitle',
            view: (_modelElement, { writer: viewWriter }) => {
                // Note: You use a more specialized createEditableElement() method here.
                const title = viewWriter.createEditableElement('div', { class: 'ck-highlight__title' });

                return toWidgetEditable(title, viewWriter);
            }
        });

        // <highlightBoxDescription> converters.
        conversion.for('upcast').elementToElement({
            model: 'highlightBoxDescription',
            view: {
                name: 'div',
                classes: 'ck-highlight__description'
            }
        });
        conversion.for('dataDowncast').elementToElement({
            model: 'highlightBoxDescription',
            view: {
                name: 'div',
                classes: 'ck-highlight__description'
            }
        });
        conversion.for('editingDowncast').elementToElement({
            model: 'highlightBoxDescription',
            view: (_modelElement, { writer: viewWriter }) => {

                // Note: You use a more specialized createEditableElement() method here.
                const div = viewWriter.createEditableElement('div', { class: 'ck-highlight__description' }); 

                return toWidgetEditable(div, viewWriter);
            }
        });

    }
    _defineBrConverters() {
        const conversion = this.editor.conversion;
        // <br> converters
        conversion.for('upcast').elementToElement({
            view: 'br',
            model: 'br'
        });
        
        conversion.for('dataDowncast').elementToElement({
            model: 'br',
            view: 'br'
        });
        
        conversion.for('editingDowncast').elementToElement({
            model: 'br',
            view: 'br'
        });
    }
}