const router = require('express').Router();
let Expense = require('../models/expenseModel');

router.route('/').get((req, res) => {
    Expense.find()
        .then(expenses => res.json(expenses))
        .catch(err => res.status(400).json('Error: ' + err));
});

//add expense
router.route('/add').post((req, res) => {
    const email = req.body.email;
    const desc = req.body.desc;
    const amount = Number(req.body.amount);
    const category = req.body.category;
    const date = Date.parse(req.body.date);

    const newExpense = new Expense({
        email,
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
router.route('/:id').get((req, res) => {
    Expense.findById(req.params.id)
        .then(expense => res.json(expense))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete expense
router.route('/:id').delete((req, res) => {
    Expense.findByIdAndDelete(req.params.id)
        .then(() => res.json('Expense deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update expense
router.route('/update/:id').post((req, res) => {
    Expense.findById(req.params.id)
        .then(expense => {
            expense.email = req.body.email;
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


module.exports = router;