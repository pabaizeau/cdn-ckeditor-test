import Comments from '../../src/Comments/Comments';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';

describe('Comments', () => {
  let editor, editorElement;

  beforeEach(() => {
    editorElement = document.createElement('div');
    document.body.appendChild(editorElement);

    return ClassicEditor
      .create(editorElement, {
        plugins: [Comments, Paragraph],
      })
      .then(newEditor => {
        editor = newEditor;
      });
  });

  afterEach(() => {
    editorElement.remove();
    return editor.destroy();
  });

  it('should be loaded', () => {
    expect(editor.plugins.get('RooleComments')).to.be.instanceOf(Comments);
  });

});
