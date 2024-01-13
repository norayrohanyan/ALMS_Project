import mongoose from 'mongoose';
const { Schema } = mongoose;

const loanSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, 
  loanDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
});


const Loan = mongoose.model('Loan', loanSchema);

export default Loan;
