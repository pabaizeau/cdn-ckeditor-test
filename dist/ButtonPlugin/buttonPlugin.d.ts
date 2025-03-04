import { Plugin } from 'ckeditor5';
import ButtonPluginEditing from './buttonPluginEditing.js';
import ButtonPluginUI from './buttonPluginUI.js';
export default class ButtonPlugin extends Plugin {
    static get pluginName(): string;
    static get requires(): (typeof ButtonPluginEditing | typeof ButtonPluginUI)[];
}
