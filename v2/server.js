//import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const items = require('./routes/api/items');

//Bodyparser Middleware

app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//connect to mongo (promise based)
mongoose
    .connect(db)
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));

//use routes if /api/items/* is called
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));