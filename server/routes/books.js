import express from 'express';
import BookController from '../controllers/bookController.js';

const router = express.Router();

router.get('/', BookController.getAllBooks);
router.get('/bookdetails/:isbn', BookController.getBook);
router.get('/search', BookController.searchBooks);
router.get('/categories', BookController.getCategories);

export default router;
