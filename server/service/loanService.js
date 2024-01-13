import Loan from '../models/Loan.js';
import Book from '../models/Book.js';
import User from '../models/User.js';
import TokenService from './tokenService.js';

class LoanService {
    static async getBorrowedBooks(token) {
        try {
          const userData = await TokenService.validateAccessToken(token);
          const userId = userData.id;
      
          const bookIds = await Loan.distinct('book', { user: userId });
          const books = await Book.find({ _id: { $in: bookIds } });
          return books.map((book) => ({
            bookId: book._id,
            title: book.title,
            authors: book.authors,
            isbn: book.isbn,
            cover_url: book.cover_url,
          }));
        } catch (error) {
          console.error('Error in loan service:', error.message);
          throw new Error('Internal Server Error');
        }
      }
      
    static async borrowBook(token, bookId) {
    try {
        const userData = await TokenService.validateAccessToken(token);
        const userId = userData.id;
        const user = await User.findById(userId);
        if (!user) {
        throw new Error('User not found.');
        }
    
        const book = await Book.findById(bookId);
        if (!book || !book.availability) {
        throw new Error('Book not available for borrowing/loaning.');
        }
    
        const existingLoan = await Loan.findOne({ user: userId, book: book._id });
        if (existingLoan) {
        throw new Error('User already has an active loan for this book.');
        }
    
        const loan = new Loan({
        user: user._id,
        book: book._id,
        loanDate: new Date(),
        returnDate: null,
        });
    
        await loan.save();
    
        book.availability = false;
        await book.save();
    
        return { success: true, message: 'Book borrowed successfully.' };
    } catch (error) {
        console.error('Error in loan service:', error.message);
        throw new Error(error.message || 'Internal Server Error');
    }
    }
    
    static async reserveBook(token, bookId) {
    try {
        const userData = await TokenService.validateAccessToken(token);
        const userId = userData.id;
    
        const book = await Book.findById(bookId);
        if (!book) {
        throw new Error('Book not available for borrowing/loaning.');
        }
    
        const loan = await Loan.findOneAndDelete({ user: userId, book: book._id });
        if (!loan) {
        throw new Error('No active loan found for the user and book.');
        }
    
        book.availability = true;
        await book.save();
    
        return { success: true, message: 'Book reserved successfully.', loan };
    } catch (error) {
        console.error('Error in loan service:', error.message);
        throw new Error(error.message || 'Internal Server Error');
    }
    }
}

export default LoanService;
