import { Command } from 'ckeditor5';
import { createHighlightBox } from './utils';

export default class InsertHighlightCommand extends Command {
    declare public value: boolean;

    override execute({ value }: { value: string }) {
        this.editor.model.change(writer => {
            const selection = this.editor.model.document.selection;
            const range = selection.getFirstRange();
            const highlightBox = createHighlightBox(writer, selection, value);

            if (range) {
                writer.remove(range);
                const insertPosition = range.start;
                this.editor.model.insertContent(highlightBox, insertPosition);
            } else {
                this.editor.model.insertContent(highlightBox);
            }
        });
    }

    override refresh() {
        this.isEnabled = true;
    }
}
