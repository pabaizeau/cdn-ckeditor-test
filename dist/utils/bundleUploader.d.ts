/**
 * Utility for uploading editor bundle to CKEditor Cloud Services
 */
/**
 * Uploads editor bundle to CKEditor Cloud Services
 * @param organizationId Your organization ID
 * @param environmentId Your environment ID
 * @param token Authorization token
 * @param bundleVersion Version identifier for this bundle
 */
export declare function uploadEditorBundle(organizationId: string, environmentId: string, token: string, bundleVersion: string): Promise<boolean>;
