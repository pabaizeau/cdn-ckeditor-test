/**
 * @module buttonPlugin/buttonplugintoolbar
 */

import { Plugin } from 'ckeditor5';

import { WidgetToolbarRepository } from 'ckeditor5';
import { getSelectedButtonPluginViewWidget } from './utils.js';

/**
 * The buttonPlugin toolbar plugin. It creates and manages the buttonPlugin toolbar (the toolbar displayed when an buttonPlugin is selected).
 *
 * For an overview, check the {@glink features/highlights/highlights-overview#buttonPlugin-contextual-toolbar buttonPlugin contextual toolbar} documentation.
 *
 * Instances of toolbar components (e.g. buttons) are created using the editor's
 * {@link module:ui/componentfactory~ComponentFactory component factory}
 * based on the {@link module:buttonPlugin/highlightconfig~ButtonPluginConfig#toolbar `buttonPlugin.toolbar` configuration option}.
 *
 * The toolbar uses the {@link module:ui/panel/balloon/contextualballoon~ContextualBalloon}.
 */
export default class ButtonPluginToolbar extends Plugin {
	/**
     * @inheritDoc
     */
	public static get requires() {
		return [ WidgetToolbarRepository ] as const;
	}

	/**
     * @inheritDoc
     */
	public static get pluginName() {
		return 'ButtonPluginToolbar' as const;
	}

	/**
     * @inheritDoc
     */
	public async afterInit(): Promise<void> {
		const editor = this.editor;
		const t = editor.t;
		const widgetToolbarRepository = editor.plugins.get( WidgetToolbarRepository );

		widgetToolbarRepository.register( 'buttonPlugin', {
			ariaLabel: t( 'ButtonPlugin Toolbar' ),
			items: [ 'buttonPlugin', 'openButtonPlugin' ],
			getRelatedElement: getSelectedButtonPluginViewWidget
		} );
	}
}
