import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { ClassicEditor, Essentials, Paragraph, Heading } from 'ckeditor5';
import Editorjs from '../src/editorjs.js';

describe( 'Editorjs', () => {
	it( 'should be named', () => {
		expect( Editorjs.pluginName ).to.equal( 'Editorjs' );
	} );

	describe( 'init()', () => {
		let domElement: HTMLElement, editor: ClassicEditor;

		beforeEach( async () => {
			domElement = document.createElement( 'div' );
			document.body.appendChild( domElement );

			editor = await ClassicEditor.create( domElement, {
				licenseKey: 'GPL',
				plugins: [
					Paragraph,
					Heading,
					Essentials,
					Editorjs
				],
				toolbar: [
					'editorjs'
				]
			} );
		} );

		afterEach( () => {
			domElement.remove();
			return editor.destroy();
		} );

		it( 'should load Editorjs', () => {
			const myPlugin = editor.plugins.get( 'Editorjs' );

			expect( myPlugin ).to.be.an.instanceof( Editorjs );
		} );

		it( 'should add an icon to the toolbar', () => {
			expect( editor.ui.componentFactory.has( 'editorjs' ) ).to.equal( true );
		} );

		it( 'should add a text into the editor after clicking the icon', () => {
			const icon = editor.ui.componentFactory.create( 'editorjs' );

			expect( editor.getData() ).to.equal( '' );

			icon.fire( 'execute' );

			expect( editor.getData() ).to.equal( '<p>Hello CKEditor 5!</p>' );
		} );
	} );
} );
