import { Plugin, Widget, toWidget } from 'ckeditor5';

class ButtonPluginEditing extends Plugin {
	static get requires() {
		return [ Widget ];
	}

	init() {
		this._defineSchema();
		this._defineConverters();
	}

	_defineSchema() {
		const schema = this.editor.model.schema;
		schema.register( 'buttonPlugin', {
			isObject: true,
			allowWhere: '$block',
			allowAttributes: [ 'href', 'title' ]
		} );
	}

	_defineConverters() {
		const conversion = this.editor.conversion;

		// Downcast conversion for displaying the widget in the editor.
		conversion.for( 'downcast' ).elementToElement( {
			model: 'buttonPlugin',
			view: ( modelItem, { writer: viewWriter } ) => {
				const href = modelItem.getAttribute( 'href' ) as string;
				const title = modelItem.getAttribute( 'title' ) as string;

				const widgetContainer = viewWriter.createContainerElement( 'figure', {
					class: 'button-plugin',
					'data-href': href,
					'data-title': title
				} );

				const linkContainer = viewWriter.createContainerElement( 'div', { class: 'button-plugin-container' } );
				const linkElement = viewWriter.createContainerElement( 'a', {
					class: 'button-plugin-content',
					href,
					target: '_blank',
					rel: 'nofollow noindex noreferrer'
				} );
				// add value title to the titleDIv
				const titleDiv = viewWriter.createContainerElement( 'div', {
					class: 'button-plugin-title'
				} );
				viewWriter.insert( viewWriter.createPositionAt( titleDiv, 0 ), viewWriter.createText( title ) );

				const anchorDiv = viewWriter.createContainerElement( 'div', {
					class: 'button-plugin-anchor'
				} );
				viewWriter.insert( viewWriter.createPositionAt( anchorDiv, 0 ), viewWriter.createText( href ) );

				viewWriter.insert( viewWriter.createPositionAt( linkElement, 'end' ), titleDiv );
				viewWriter.insert( viewWriter.createPositionAt( linkElement, 'end' ), anchorDiv );

				viewWriter.insert( viewWriter.createPositionAt( linkContainer, 0 ), linkElement );
				viewWriter.insert( viewWriter.createPositionAt( widgetContainer, 0 ), linkContainer );

				return toWidget( widgetContainer, viewWriter, { label: 'Link Preview Widget' } );
			}
		} );

		// Upcast conversion for converting pasted or loaded content into the model structure.
		conversion.for( 'upcast' ).elementToElement( {
			view: {
				name: 'figure',
				classes: 'button-plugin'
			},
			model: ( viewElement, { writer: modelWriter } ) => {
				return modelWriter.createElement( 'buttonPlugin', {
					href: viewElement.getAttribute( 'data-href' ),
					title: viewElement.getAttribute( 'data-title' )
				} );
			}
		} );
	}
}

export default ButtonPluginEditing;
