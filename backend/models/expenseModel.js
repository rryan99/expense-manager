const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    email: { type: String, require: true },
    amount: { type: Number, require: true },
    category: { type: String, required: true },
    date: { tpye: Date, required: true }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;