import Book from "../models/Book.js";
import Loan from "../models/Loan.js";

class BookService {
    static async getAllBooks(filter, limit = 6, offset = 0) {
        try {
            let query = {};
            if (filter !== 'All books') {
                query.category = filter;
            }
            const books = await Book.find(query).limit(limit).skip(offset);
            return books;
        } 
        catch (error) {
            console.error('Error fetching books:', error.message);
            throw new Error('Internal Server Error');
        }
    }

    static async getCategories() {
        try {
            const categories = await Book.find().distinct('category');
            return categories;
        }
        catch (error) {
            console.error('Error fetching categories:', error.message);
            throw new Error('Internal Server Error');
        }
    }

    static async getBook(isbn) {
        try {
            const book = await Book.findOne({isbn: isbn});
            const loan = await Loan.findOne({ book: book._id }) || null;
          
            return {book, loan};
        }
        catch (error) {
            console.error('Error fetching book:', error.message);
            throw new Error('Internal Server Error');
        }
    }

    static async searchBooks(query) {
        try {
            const searchResults = await Book.find({
                $or: [
                    { title: { $regex: new RegExp(query, 'i') } },
                    { author: { $regex: new RegExp(query, 'i') } },
                ],
            });
            return searchResults;
        } 
        catch (error) {
            console.error('Error searching books:', error.message);
            throw new Error('Internal Server Error');
        }
    }
}

export default BookService;