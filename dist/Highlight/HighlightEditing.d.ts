import { Plugin } from 'ckeditor5';
import { Widget } from 'ckeditor5';
import { Enter } from 'ckeditor5';
export default class HighlightEditing extends Plugin {
    static get requires(): (typeof Widget | typeof Enter)[];
    static get pluginName(): "HighlightEditing";
    init(): void;
    _setupEnterKeyHandling(): void;
    _handleEnterInHighlightBox(): void;
    _defineSchema(): void;
    _defineConverters(): void;
    _defineBrConverters(): void;
}
