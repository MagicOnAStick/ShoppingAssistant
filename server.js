//import dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');

const app = express();

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const recipe = require('./routes/api/recipe');
const weekplan = require('./routes/api/weekplan');
const achievement = require('./routes/api/achievement');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config //TODO check deprecation warn
const db = require('./config/keyslocal').mongoURI;

//connect to mongo (promise based)
mongoose
    .connect(db,{ useNewUrlParser: true })
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));

//Passport is used to access private routes, in this case with a jwt strategy (if a jwt token is set, the route can be accessed)
app.use(passport.initialize());
//Passport Config
require('./config/passport')(passport);

//use routes if paths are called from the application
app.use('/api/items',items);
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/recipe', recipe);
app.use('/api/weekplan',weekplan);
app.use('/api/achievement', achievement);

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