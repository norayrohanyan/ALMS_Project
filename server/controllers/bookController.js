import { query } from "express";
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

    static async searchBooks(req, res) {
        try {
            const { query } = req.query;
            const searchResult = await BookService.searchBooks(query);
            res.status(201).json(searchResult);
        }
        catch(error) {
            console.error('Error during book search:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default BookController;
