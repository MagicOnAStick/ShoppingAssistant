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
        }).catch(() => res.status(404).json({postnotfound: 'no post found with this id'}))
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
        }).catch(() => res.status(404).json({postnotfound: 'no post found with this id'}))
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


// @route post api/recipe/like/:id
// @desc  like a specific recipe
// @access private
router.post('/like/:id', passport.authenticate('jwt',{ session: false }), (req,res) => {
    Profile.findOne({user: req.user.id})
    .then(profile => {
        Recipe.findById(req.params.id)
        .then(recipe => {
            //checks if this user it is already in the recipes likes array
            if(recipe.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                return res.status(400).json({alreadyLikedError: 'User already liked the recipe'});
            }
            // add user to the likes array of the recipe
            recipe.likes.unshift({user : req.user.id});
            recipe.save().then(recipe => res.json(recipe));

        }).catch(() => res.status(404).json({postnotfound: 'no post found with this id'}))
    })
});

// @route post api/recipe/unlike/:id
// @desc  like a specific recipe
// @access private
router.post('/unlike/:id', passport.authenticate('jwt',{ session: false }), (req,res) => {
    Profile.findOne({user: req.user.id})
    .then(profile => {
        Recipe.findById(req.params.id)
        .then(recipe => {
            //checks if this user it is already in the recipes likes array
            if(recipe.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                return res.status(400).json({notLikedError: 'You have not yet liked this post'});
            }
            //get remove index
            recipe.likes
            .splice(recipe.likes
                    .map(item => item.user.toString())
                    .indexOf(req.user.id),1);

            recipe.save().then(recipe => res.json(recipe));

        }).catch(() => res.status(404).json({postnotfound: 'no recipe found with this id'}));
    });
});

// @route post api/recipe/comment/:id
// @desc  comment a specific recipe (with given id)
// @access private
router.post('/comment/:id', passport.authenticate('jwt',{ session: false }), (req,res) => {
    
    //validates the comment text
    const {errors, isValid} = validateRecipeInput(req.body);

    if(!isValid){
        //return 400 with errors from validation
        return res.status(400).json(errors);
    }
    
    Recipe.findById(req.params.id)
    .then(recipe => {
        const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
        }
        //add comment to array
        recipe.comments.unshift(newComment);
        recipe.save().then(recipe => res.json(recipe));
    }).catch(() => res.status(404).json({postnotfound: 'no recipe found with this id'}));
});

// @route delete api/recipe/comment/:id/:comment_id
// @desc  delete a specific comment from a specific recipe (with given id)
// @access private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt',{ session: false }), (req,res) => {    
    Recipe.findById(req.params.id)
    .then(recipe => {
        //check if the comment exits
        if(recipe.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
            return res.status(404).json({ commentnotexits: 'comment does not exist!'});
        }
            //splice the comment with the matching id out of the comments array
            recipe.comments.splice(recipe.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id),1);

            recipe
            .save()
            .then(recipe => res.json(recipe));

    }).catch(() => res.status(404).json({postnotfound: 'no recipe found with this id'}));
});


module.exports = router;