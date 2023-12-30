import Book from "../models/Book.js";

class BookService {
    static async getAllBooks() {
        try {
            const books = await Book.find();
            return books;
        }
        catch (error) {
            console.error('Error fetching books:', error.message);
            throw new Error('Internal Server Error');
        }
    }

    static async getBook(isbn) {
        try {
            const book = await Book.findOne({isbn: isbn});
            return book;
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