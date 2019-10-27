const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    email: { type: String, required: true },
    desc: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;