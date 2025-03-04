import EditorjsDataProcessor from "./editorjsdataprocessor";
import { Plugin, type Editor } from 'ckeditor5';

export default class Editorjs extends Plugin {
  static get pluginName() {
    return "Editorjs" as const;
  }

  constructor(editor: Editor) {
    super(editor);

    editor.data.processor = new EditorjsDataProcessor(editor.data.viewDocument);
  }
}
