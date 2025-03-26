import { Plugin } from 'ckeditor5';
import UsersInit from './UsersInit.js';

export default class RooleUsers extends Plugin {
  static get pluginName() {
    return 'RooleUsers';
  }

  static get requires() {
    return [UsersInit];
  }

  init() {
    console.log('RooleUsers plugin initialized');
    // Forward any needed methods to work with Comments plugin
  }
}
