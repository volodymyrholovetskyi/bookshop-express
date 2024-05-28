"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.httpClient = void 0;
exports.httpClient = {
    url_api: "http://localhost:8080/api/orders",
};
exports.config = {
    log4js: {
        appenders: {
            console: {
                type: 'console',
            },
            ms: {
                type: 'dateFile',
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true,
                filename: 'log/ms',
                maxLogSize: 1000000,
                compress: true,
            },
        },
        categories: {
            default: {
                appenders: ['ms', 'console'],
                level: 'debug',
            },
        },
    }
};
//# sourceMappingURL=index.js.map