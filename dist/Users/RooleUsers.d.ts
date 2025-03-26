import { Plugin } from 'ckeditor5';
import UsersInit from './UsersInit.js';
export default class RooleUsers extends Plugin {
    static get pluginName(): string;
    static get requires(): (typeof UsersInit)[];
    init(): void;
}
