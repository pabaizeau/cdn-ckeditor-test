import HighlightEditing from './HighlightEditing';
import HighlightUI from './HighlightUI';
import { Plugin } from 'ckeditor5';
import './highlight.css';
export default class Highlight extends Plugin {
    static get pluginName(): "Highlight";
    static get requires(): (typeof HighlightEditing | typeof HighlightUI)[];
}
