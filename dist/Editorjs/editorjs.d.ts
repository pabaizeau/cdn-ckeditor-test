import { Plugin, type Editor } from 'ckeditor5';
export default class Editorjs extends Plugin {
    static get pluginName(): "Editorjs";
    constructor(editor: Editor);
}
