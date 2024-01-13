import express from 'express';
import LoanController from '../controllers/loanController.js';

const router = express.Router();

router.post('/borrow/:bookId', LoanController.borrowBook);
router.post('/reserve/:bookId', LoanController.reserveBook);
router.post('/borrowed-books', LoanController.getBorrowedBooks);

export default router;
