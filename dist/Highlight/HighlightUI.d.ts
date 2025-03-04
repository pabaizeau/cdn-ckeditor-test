import { Plugin } from 'ckeditor5';
import InsertHighlightCommand from './InsertHighlightCommand';
declare module '@ckeditor/ckeditor5-core' {
    interface CommandsMap {
        insertHighlightBox: InsertHighlightCommand;
    }
}
export default class HighlightUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "HighlightUI";
    init(): void;
}
