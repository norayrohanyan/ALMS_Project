import mongoose from 'mongoose';
import bookData from '../books.json' assert {type: 'json'};
import Book from '../models/Book.js';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.mongodb, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB!');

  try {
   if (!bookData) {
      await Book.insertMany(bookData);
      console.log('Data inserted successfully');
   }
  } 
  catch (error) {
    console.error('Error inserting data:', error);
  }
});

export default db;