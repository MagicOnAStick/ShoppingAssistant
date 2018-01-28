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

// bring in exported with the same name defined in /models/recipe
let RecipeModel = require('./models/Recipe');

//set 'views' to path so no /views/ is required before loading views (can directy loaded via viewname)
app.set('views',path.join(__dirname, 'views'));
// load template engine
app.set('view engine','pug');