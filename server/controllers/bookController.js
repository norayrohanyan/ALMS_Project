import BookService from "../service/bookService.js";

class BookController {
    static async getAllBooks(req, res) {
        try {
            const books = await BookService.getAllBooks();
            res.status(201).json(books);
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }

    static async getBook(req, res) {
        try {
            const book = await BookService.getBook(req.params.isbn);
            res.status(201).json(book);
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
}

export default BookController;