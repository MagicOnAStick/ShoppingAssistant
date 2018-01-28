"use strict";
const mongoose = require('mongoose');

//Blogpost Schema
let recipeSchema = mongoose.Schema({
    dish_name:{
        type: String,
        required: true
    },
    ingredients:[
            {
                name: String,
				amount: Number,
				amount_desc: String,
				category: String
            }],
    author:{
        type: String,
        required: false
    }
});

//makes the recipe Schema public when require(path/Recipe) is called
let Recipe = module.exports = mongoose.model('Recipe',blogpostSchema);