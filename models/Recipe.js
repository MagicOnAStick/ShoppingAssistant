"use strict";
const mongoose = require('mongoose');

//Blogpost Schema
let recipeSchema = mongoose.Schema({
    _id:{
        type: String,
        required: true,
    },
    dish_name:{
        type: String,
        required: true
    },
    ingredients:[{

                name: String,
			 	amount: Number,
                amount_desc: String,
                amount_type: String,                
                category: String
            }
    ]
        
},{collection:'grocerylist'});

//makes the recipe Schema public when require(path/Recipe) is called
let Recipe = mongoose.model('Recipe',recipeSchema);
module.exports = Recipe;