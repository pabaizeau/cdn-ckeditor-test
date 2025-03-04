import { Plugin } from 'ckeditor5';
import ButtonPluginCommand from './buttonPluginCommand.js';
export default class ButtonPluginUI extends Plugin {
    actionsView: null;
    static get requires(): (typeof ButtonPluginCommand)[];
    static get pluginName(): string;
    init(): void;
}
