/**
 * Interface for the CKEditor Users plugin
 */
export interface UsersPluginInterface {
    /**
     * Adds a user to the users list.
     */
    addUser(userData: {
        id: string;
        name: string;
    }): void;
    /**
     * Sets the current user.
     */
    defineMe(userId: string): void;
}
