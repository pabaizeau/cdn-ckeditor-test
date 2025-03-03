import { describe, expect, it } from 'vitest';
import { Editorjs as EditorjsDll, icons } from '../src/index.js';
import Editorjs from '../src/editorjs.js';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 Editorjs DLL', () => {
	it( 'exports Editorjs', () => {
		expect( EditorjsDll ).to.equal( Editorjs );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
