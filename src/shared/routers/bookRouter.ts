import express from "express";
import {
  createBook,
  countBooks,
  findBooks,
} from "../../catalog/controllers/bookController";

const router = express.Router();
const basePath = '/api/books'

router.post(basePath, createBook);
router.get(basePath, findBooks);
router.post(`${basePath}/_counts`, countBooks);

export default router;