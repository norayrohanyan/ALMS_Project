// app.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Set up your routes
const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');
const booksRoutes = require('./routes/books');

app.use('/', indexRoutes);
app.use('/users', usersRoutes);
app.use('/books', booksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
