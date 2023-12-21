import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  isbn: { type: String, required: true },
  published_year: { type: Number, required: true },
  category: [{ type: String, required: true }],
  availability: { type: Boolean, required: true },
  location: {
    shelf: { type: String, required: true },
    row: { type: Number, required: true },
  },
  additional_info: {
    publisher: { type: String, required: true },
    language: { type: String, required: true },
    page_count: { type: Number, required: true },
  },
  cover_url: { type: String, required: true },
  online_version_url: { type: String, required: true },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
