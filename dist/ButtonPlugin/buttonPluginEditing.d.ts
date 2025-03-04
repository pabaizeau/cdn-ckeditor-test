import { Plugin, Widget } from 'ckeditor5';
declare class ButtonPluginEditing extends Plugin {
    static get requires(): (typeof Widget)[];
    init(): void;
    _defineSchema(): void;
    _defineConverters(): void;
}
export default ButtonPluginEditing;
