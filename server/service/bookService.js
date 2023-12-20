import Book from "../models/Book.js";

class BookService {
    static async getAllBooks() {
        try {
            const books = Book.find();
            return books;
        }
        catch (error) {
            console.error('Error fetching books:', error.message);
            throw new Error('Internal Server Error');
        }
    }
}

export default BookService;