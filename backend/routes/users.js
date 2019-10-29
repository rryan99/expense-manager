const express = require('express');
let User = require('../models/userModel');

const app = express();

app.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
});

app.post('/add', (req, res) => {
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const password = req.body.password;

    const newUser = new User({ email, fname, lname, password });

    newUser.save()
        .then(() => res.json('User created!'))
        .catch(err => res.status(400).json('Error: ' + err))
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email, password: password })
        .then(user => {
            if(!user){
                res.status(204).json('User does not exist.');
            }
            else{
                res.json(user);
            }
        })
        .catch(err => res.status(400).json('Error ' + err))
});

module.exports = app;