"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../../catalog/controllers/bookController");
const router = express_1.default.Router();
const basePath = '/api/books';
router.post(basePath, bookController_1.createBook);
router.get(basePath, bookController_1.findBooks);
router.post(`${basePath}/_counts`, bookController_1.countBooks);
exports.default = router;
//# sourceMappingURL=bookRouter.js.map