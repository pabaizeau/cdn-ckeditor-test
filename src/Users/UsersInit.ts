import { Plugin } from 'ckeditor5';
import type { UsersPluginInterface } from './UsersInterface.js';

interface User {
	id: string;
	firstname?: string;
	lastname?: string;
	email?: string;
	name: string;
}

// User initialization plugin
export default class UsersInit extends Plugin {
	constructor(editor: any) {
		super(editor);
	}

	static get pluginName() {
		return 'UsersInit';
	}

	init() {
		const editor = this.editor;
		console.log('UsersInit init called');

		// Try to get user config from comments
		const userConfig = editor.config.get('comments.user') as User;
		console.log('User config from editor:', userConfig);

		try {
			// Create a properly formatted user object with required fields
			const userData = {
				id: userConfig?.id || 'default-user-' + Date.now(),
				name: userConfig?.name || 'Default User'
			};

			console.log('UsersInit: Using user data', userData);

			// Get Users plugin and add the user
			try {
				const usersPlugin = editor.plugins.get('Users') as UsersPluginInterface;

				// Add the user and set as current
				usersPlugin.addUser(userData);
				usersPlugin.defineMe(userData.id);

				// Always update the config to ensure consistency
				editor.config.set('comments.user', userData);

				console.log('UsersInit: Successfully initialized user with ID:', userData.id);
			} catch (error) {
				console.error('UsersInit: Error accessing Users plugin', error);
			}
		} catch (error) {
			console.error('UsersInit: Error processing user data', error);
		}
	}
}

