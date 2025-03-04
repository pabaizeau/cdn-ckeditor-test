/**
 * @module highlight/highlighttoolbar
 */

import { Plugin} from 'ckeditor5';

import { WidgetToolbarRepository } from 'ckeditor5';
import { getSelectedHighlightViewWidget } from './utils';

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
    public static get requires() {
        return [WidgetToolbarRepository] as const;
    }

    /**
     * @inheritDoc
     */
    public static get pluginName() {
        return 'HighlightToolbar' as const;
    }

    /**
     * @inheritDoc
     */
    public async afterInit(): Promise<void> {
        const editor = this.editor;
        const t = editor.t;
        const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

        widgetToolbarRepository.register('highlight', {
            ariaLabel: t('Highlight Toolbar'),
            items: ['highlight'],
			getRelatedElement: getSelectedHighlightViewWidget
        });
    }
}
