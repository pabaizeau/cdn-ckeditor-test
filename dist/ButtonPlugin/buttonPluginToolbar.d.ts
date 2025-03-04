/**
 * @module buttonPlugin/buttonplugintoolbar
 */
import { Plugin } from 'ckeditor5';
import { WidgetToolbarRepository } from 'ckeditor5';
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
    static get requires(): readonly [typeof WidgetToolbarRepository];
    /**
     * @inheritDoc
     */
    static get pluginName(): "ButtonPluginToolbar";
    /**
     * @inheritDoc
     */
    afterInit(): Promise<void>;
}
