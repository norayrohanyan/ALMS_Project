import LoanService from "../service/loanService.js";

class LoanController {

    static async getBorrowedBooks(req, res) {
        try {
            const userId = req.body.userId;
            const borrowedBooks = await LoanService.getBorrowedBooks(userId);
            res.status(200).json(borrowedBooks);
        } 
        catch (error) {
            console.error('Error in borrowed books controller:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async borrowBook(req, res) {
        try {
          const { bookId } = req.params;
          const userId = req.body.userId;
          const result = await LoanService.borrowBook(userId, bookId);
          res.status(201).json(result);
        } catch (error) {
          console.error('Error in loan controller (borrowBook):', error);
          res.status(500).json({ message: error.message || 'Internal Server Error' });
        }
      }
      
      static async reserveBook(req, res) {
        try {
          const { userId } = req.body;
          const { bookId } = req.params;
          const result = await LoanService.reserveBook(userId, bookId);
          res.status(201).json(result);
        } catch (error) {
          console.error('Error in loan controller (reserveBook):', error);
          res.status(500).json({ message: error.message || 'Internal Server Error' });
        }
      }
}

export default LoanController;
