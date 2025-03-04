/**
 * @module highlight/highlighttoolbar
 */
import { Plugin } from 'ckeditor5';
import { WidgetToolbarRepository } from 'ckeditor5';
/**
 * The highlight toolbar plugin. It creates and manages the highlight toolbar (the toolbar displayed when an highlight is selected).
 *
 * For an overview, check the {@glink features/highlights/highlights-overview#highlight-contextual-toolbar highlight contextual toolbar} documentation.
 *
 * Instances of toolbar components (e.g. buttons) are created using the editor's
 * {@link module:ui/componentfactory~ComponentFactory component factory}
 * based on the {@link module:highlight/highlightconfig~HighlightConfig#toolbar `highlight.toolbar` configuration option}.
 *
 * The toolbar uses the {@link module:ui/panel/balloon/contextualballoon~ContextualBalloon}.
 */
export default class HighlightToolbar extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof WidgetToolbarRepository];
    /**
     * @inheritDoc
     */
    static get pluginName(): "HighlightToolbar";
    /**
     * @inheritDoc
     */
    afterInit(): Promise<void>;
}
