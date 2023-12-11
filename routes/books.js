const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('books/index', { pageTitle: 'Books' });
});

router.get('/details/:id', (req, res) => {
  res.render('books/details', { pageTitle: 'Book Details', bookId: req.params.id });
});

module.exports = router;