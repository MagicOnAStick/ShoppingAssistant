const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Recipe = require('../../models/Recipe');

const validateRecipeInput = require('../../validation/recipe');

// @route POST api/recipe
// @desc  Create post
// @access private 
router.post('/', passport.authenticate('jwt',{ session: false }), (req,res) =>{
    
    const {errors, isValid} = validateRecipeInput(req.body);

    if(!isValid){
        //return 400 with errors from validation
        return res.status(400).json(errors);
    }
    
    const newRecipe = new Recipe({
        user: req.user.id,
        avatar: req.user.avatar,
        text: req.body.text,
        name: req.body.name,
        image: req.body.image
    });
    newRecipe.save()
    .then(recipe => res.json(recipe));
});


module.exports = router;