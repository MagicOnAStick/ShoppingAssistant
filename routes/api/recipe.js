const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Recipe = require('../../models/Recipe');

const Profile = require('../../models/Profile');

const validateRecipeInput = require('../../validation/recipe');

// @route GET api/recipe
// @desc  Get all recipes
// @access public
router.get('/', (req,res) => {
    Recipe.find()
    .sort({date: -1})
    .then(recipes => res.json(recipes))
    .catch(() => {
        res.status(404).json({norecipesfound: 'no recipes found'});
    });
});

// @route GET api/recipe/:id
// @desc  Get recipe by id
// @access public
router.get('/:id', (req,res) => {
    Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(() => {
        res.status(404).json({norecipefound: 'no recipe found with that id'});
    });
});

// @route delete api/recipe/:id
// @desc  delete recipe by id
// @access private
router.delete('/:id', passport.authenticate('jwt',{ session: false }), (req,res) => {
    Profile.findOne({user: req.user.id})
    .then(profile => {
        Recipe.findById(req.params.id)
        .then(recipe => {
            //check if recipe owner is the current user
            if(recipe.user.toString() !== req.user.id){
                return res.status(401).json({notauthorized: 'user not authorized to delete recipe'});
            }
            recipe.remove().then(() => res.json({success: true}));
        }).catch(err => res.status(404).json({postnotfound: 'no post found with this id'}))
    })
});

// @route delete api/recipe/:id
// @desc  delete recipe by id
// @access private
router.put('/:id', passport.authenticate('jwt',{ session: false }), (req,res) => {

    const {errors, isValid} = validateRecipeInput(req.body);

    if(!isValid){
        //return 400 with errors from validation
        return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id})
    .then(profile => {
        Recipe.findById(req.params.id)
        .then(recipe => {
            //check if recipe owner is the current user
            if(recipe.user.toString() !== req.user.id){
                return res.status(401).json({notauthorized: 'user not authorized to delete recipe'});
            }
            recipe.updateOne({$set : req.body})
            .then(() => res.json({success: true}));
        }).catch(err => res.status(404).json({postnotfound: 'no post found with this id'}))
    })
});

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