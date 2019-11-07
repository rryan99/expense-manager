const express = require('express');
let Expense = require('../models/expenseModel');

const app = express();

//get all expenses
app.get('/', (req, res) => {
    Expense.find()
        .then(expenses => res.json(expenses))
        .catch(err => res.status(400).json('Error: ' + err))
});

//add expense
app.post('/add', (req, res) => {
    const desc = req.body.desc;
    const amount = Number(req.body.amount);
    const category = req.body.category;
    const date = Date.parse(req.body.date);

    const newExpense = new Expense({
        desc,
        amount,
        category,
        date
    });

    newExpense.save()
        .then(() => res.json('Expense created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get expense
app.get('/:id', (req, res) => {
    Expense.findById(req.params.id)
        .then(expense => res.json(expense))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete expense
app.delete('/:id', (req, res) => {
    Expense.findByIdAndDelete(req.params.id)
        .then(() => res.json('Expense deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update expense
app.post('/update/:id', (req, res) => {
    Expense.findById(req.params.id)
        .then(expense => {
            expense.desc = req.body.desc;
            expense.amount = Number(req.body.amount);
            expense.category = req.body.category;
            expense.date = Date.parse(req.body.date);

            expense.save()
                .then(() => res.json('Expense updated.'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = app;