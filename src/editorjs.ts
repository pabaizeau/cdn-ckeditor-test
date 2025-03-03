import { Plugin, ButtonView } from 'ckeditor5';

import ckeditor5Icon from '../theme/icons/ckeditor.svg';

export default class Editorjs extends Plugin {
	public static get pluginName() {
		return 'Editorjs' as const;
	}

	public init(): void {
		const editor = this.editor;
		const t = editor.t;
		const model = editor.model;

		// Register the "editorjs" button, so it can be displayed in the toolbar.
		editor.ui.componentFactory.add( 'editorjs', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'Editorjs' ),
				icon: ckeditor5Icon,
				tooltip: true
			} );

			// Insert a text into the editor after clicking the button.
			this.listenTo( view, 'execute', () => {
				model.change( writer => {
					const textNode = writer.createText( 'Hello CKEditor 5!' );

					model.insertContent( textNode );
				} );

				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}
