import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/users.js';
import bookRoutes from './routes/books.js';
import dotenv from 'dotenv';
dotenv.config();
import './config/database.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/bookdetails', bookRoutes);

app.use('/api/users', userRoutes);
// app.use('/api/loans', require('./routes/loans'));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
