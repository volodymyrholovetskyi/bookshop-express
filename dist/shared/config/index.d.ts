export declare const httpClient: {
    url_api: string;
};
export declare const config: {
    log4js: {
        appenders: {
            console: {
                type: string;
            };
            ms: {
                type: string;
                pattern: string;
                alwaysIncludePattern: boolean;
                filename: string;
                maxLogSize: number;
                compress: boolean;
            };
        };
        categories: {
            default: {
                appenders: string[];
                level: string;
            };
        };
    };
};
