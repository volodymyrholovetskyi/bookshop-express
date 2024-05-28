import app from './app';
require('module-alias/register');

(async () => {
    await app();
})();