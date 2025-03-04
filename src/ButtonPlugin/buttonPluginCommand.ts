import type { ButtonPluginResponse } from '../types/buttonPlugin.js';
import { Command } from 'ckeditor5';
import type { Writer } from 'ckeditor5';

interface PropsCommand {
    href: string;
    title: string;
}

class ButtonPluginCommand extends Command {
	override execute( data: PropsCommand ) {
		const editor = this.editor;
		const { href, title } = data;

		if ( !href ) {
			console.error( 'URL is required for a link preview.' );
			return;
		}
		this.fetchLinkData( href, title ).then( fetchedData => {
			this.insertLinkData( editor, fetchedData );
		} );
	}

	async fetchLinkData( href: string, title: string ): Promise<ButtonPluginResponse | null> {
		try {
			return {
				href,
				title
			};
		} catch ( error ) {
			console.error( 'Error fetching link data:', error );
		}
		return null;
	}

	insertLinkData( editor: any, fetchedData: ButtonPluginResponse | null ) {
		if ( fetchedData ) {
			editor.model.change( ( writer: Writer ) => {
				const buttonPluginElement = writer.createElement( 'buttonPlugin', fetchedData as unknown as Record<string, unknown> );
				editor.model.insertContent( buttonPluginElement, editor.model.document.selection );
			} );
		} else {
			console.error( 'Failed to fetch link data.' );
		}
	}
}

export default ButtonPluginCommand;
