const router = require('express').Router();
let User = require('../models/userModel');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const password = req.body.password;

    const newUser = new User({ email, fname, lname, password });

    newUser.save()
        .then(() => res.json('User created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;