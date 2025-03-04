import { Plugin } from 'ckeditor5';
import ButtonPluginEditing from './buttonPluginEditing.js';
import ButtonPluginUI from './buttonPluginUI.js';

export default class ButtonPlugin extends Plugin {
	static get pluginName() {
		return 'ButtonPlugin';
	}

	static get requires() {
		return [ ButtonPluginEditing, ButtonPluginUI ];
	}
}
