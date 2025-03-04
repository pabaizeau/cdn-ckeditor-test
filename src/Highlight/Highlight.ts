import HighlightEditing from './HighlightEditing';
import HighlightUI from './HighlightUI';
import {Plugin} from 'ckeditor5';
import './highlight.css'

export default class Highlight extends Plugin {
    public static get pluginName() {
		return 'Highlight' as const;
	}
    static get requires() {
        return [ HighlightEditing, HighlightUI ];
    }
}