const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ credentials: true }));
app.use(express.json());

//mongodb connection
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Successfully connected to database.');
});

//set routers
const expenseRouter = require('./routes/expenses');

app.use('/expenses', expenseRouter);

//listen for connections
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})