declare const mediaEmbedConfig: {
    previewsInData: boolean;
    providers: {
        name: string;
        width: number;
        height: number;
        url: RegExp;
        html: (match: RegExpMatchArray) => string;
    }[];
    extraProviders: {
        name: string;
        url: RegExp;
        width: number;
        height: number;
        html: (match: RegExpMatchArray) => string;
    }[];
};
export declare const allProviders: any;
export default mediaEmbedConfig;
