
import { Plugin } from 'ckeditor5';
import { createDropdown, addListToDropdown, ViewModel } from 'ckeditor5';
import InsertHighlightCommand from './InsertHighlightCommand';
import { Collection } from 'ckeditor5';
import { ListDropdownItemDefinition } from 'ckeditor5';
import { highlightIconToolBar } from './assets/highlightVariant';

declare module '@ckeditor/ckeditor5-core' {
    interface CommandsMap {
        insertHighlightBox: InsertHighlightCommand;
    }
}

function getDropdownItemsDefinitions(placeholderHighlights: string[]) {
    const itemDefinitions = new Collection<ListDropdownItemDefinition>();

    for (const name of placeholderHighlights) {
        const definition: ListDropdownItemDefinition = {
            type: 'button',
            model: new ViewModel({
                commandParam: name,
                label: name,
                withText: true
            })
        };

        // Add the item definition to the collection.
        itemDefinitions.add(definition);
    }

    return itemDefinitions;
}

export default class HighlightUI extends Plugin {
    /**
     * @inheritDoc
     */
    public static get pluginName() {
        return 'HighlightUI' as const;
    }

    init() {
        const editor = this.editor;
        const t = editor.t;
        const placeholderHighlights = editor.config.get('highlightConfig.types') as string[];

        // The "highlightBox" button must be registered among the UI components of the editor
        // to be displayed in the toolbar.
        editor.ui.componentFactory.add('highlight', locale => {
            const dropdownView = createDropdown(locale);

            // Populate the list in the dropdown with items.
            addListToDropdown(dropdownView, getDropdownItemsDefinitions(placeholderHighlights));

            // The button will be an instance of ButtonView.

            dropdownView.buttonView.set({
                // The t() function helps localize the editor. All strings enclosed in t() can be
                // translated and change when the language of the editor changes.
                label: t('Highlight'),
                tooltip: true,
                icon: highlightIconToolBar
            });
            // Disable the placeholder button when the command is disabled.
            const command = editor.commands.get('insertHighlightBox');
            if (command) {
                dropdownView.bind('isEnabled').to(command, 'isEnabled');
            }

            // Execute the command when the dropdown item is clicked (executed).
            this.listenTo(dropdownView, 'execute', (evt: any) => {
                editor.execute('insertHighlightBox', { value: evt.source.commandParam });
                editor.editing.view.focus();
            });

            return dropdownView;

        });

    }
}
