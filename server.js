//import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const items = require('./routes/api/items');
const users = require('./routes/api/users');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config //TODO check deprecation warn
const db = require('./config/keys').mongoURI;

//connect to mongo (promise based)
mongoose
    .connect(db)
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));

//use routes if paths are called from the application
app.use('/api/items', items);
app.use('/api/users',users);

//deployment
if(process.env.NODE_ENV === 'production'){
    console.log('inside production mode!');
    //set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));