import BookService from "../service/bookService.js";

class BookController {
    static async getAllBooks(req, res) {
        try {
            const {filter, limit, offset } = req.query;
            const books = await BookService.getAllBooks(filter, limit, offset);
            res.status(200).json(books);
        } 
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    static async getCategories(req, res) {
        try {
            const categories = await BookService.getCategories();
            res.status(200).json(categories);
        }
        catch (error) {
            console.error('Controller Error:', error.message);
            res.status(500).send({ error: 'Internal Server Error' });
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

    static async searchBooks(req, res) {
        try {
            const { query } = req.query;
            const searchResult = await BookService.searchBooks(query);
            if (searchResult.length === 0) {
                res.status(404).json({ message: 'No books found' });
            } else {
                res.status(201).json(searchResult);
            }
        }
        catch(error) {
            console.error('Error during book search:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default BookController;
