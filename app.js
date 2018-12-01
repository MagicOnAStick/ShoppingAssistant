"use strict";
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
//express module for parsing html/json bodies
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');

// connect to db
mongoose.connect(config.database);
let db = mongoose.connection;

db.once('open',()=>{
    console.log('connected to mongodb');
});

// check for db errors
db.on('error',(err)=>{
    console.log(err);
});

// init app
const app = express();
var listener = app.listen(3001, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

// bring in exported with the same name defined in /models/recipe
let RecipeModel = require('./models/Recipe');

//set 'views' to path so no /views/ is required before loading views (can directy loaded via viewname)
app.set('views',path.join(__dirname, 'views'));
// load template engine
app.set('view engine','pug');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extend:false}));
//parse application/json - adds .body object to .req to easily access body attributes
app.use(bodyParser.json());
//set/add public folder as node static folder for client stuff
app.use(express.static(path.join(__dirname,'public')));

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    //cookie: { secure: true }
  }));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// home route
app.get("/",(req,res)=>{
    let recipes = RecipeModel.find({},(err, recipes)=>{
        if (err) {
            console.log(err);
        }else{
                res.render('index',{
                title: 'Shoppingassistant',
                recipes: recipes
           });
        }
    });
});