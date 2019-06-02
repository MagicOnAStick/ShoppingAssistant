const express = require('express');
const router = express.Router();
const passport = require('passport');

const Weekplan = require('../../models/Weekplan');

const validateWeekplanTextInput = require('../../validation/weekplan');


// @route GET api/weekplan/:id
// @desc  Get weekplan by id
// @access public
router.get('/:id', (req,res) => {
    Weekplan.findById(req.params.id)
    .then(plan => res.json(plan))
    .catch(() => {
        res.status(404).json({noplanfound: 'no plan found with that id'});
    });
});

// @route GET api/recipe
// @desc  Get all recipes
// @access public
router.get('/', (req,res) => {
    Weekplan.find()
    .sort({date: -1})
    .then(plan => res.json(plan))
    .catch(() => {
        res.status(404).json({noplansfound: 'no weekplans found'});
    });
});

// @route delete api/weekplan/:id
// @desc  delete weekplan by id
// @access private
router.delete('/:id', passport.authenticate('jwt',{ session: false }), (req,res) => {
        
        Weekplan.findById(req.params.id)
            .then(plan => {
                //check if recipe owner is the current user
                if(plan.user.toString() !== req.user.id){
                    return res.status(401).json({notauthorized: 'user not authorized to delete weekplan'});
                }
                plan.remove().then(() => res.json({success: true}));
            }).catch(() => res.status(404).json({plannotfound: 'no weekplan found with this id'}))
});

// @route update api/weekplan/:id
// @desc  update weekplan by id
// @access private
router.put('/:id', passport.authenticate('jwt',{ session: false }), (req,res) => {

        Weekplan.findById(req.params.id)
        .then(plan => {
            //check if recipe owner is the current user
            if(plan.user.toString() !== req.user.id){
                return res.status(401).json({notauthorized: 'user not authorized to modify plan'});
            }
            plan.updateOne({$set : req.body})
            .then(() => res.json({success: true}));
            //do not need to update the profiles weekplan because it already holds a reference to the updates weekplan
        }).catch(() => res.status(404).json({plannotfound: 'no weekplan found with this id'}))
});

// @route POST api/weekplan
// @desc  Create weekplan with recipe ids
// @access private 
router.post('/', passport.authenticate('jwt',{ session: false }), (req,res) =>{
    
    const {errors, isValid} = validateWeekplanTextInput(req.body);

    if(!isValid){
        //return 400 with errors from validation
        return res.status(400).json(errors);
    }
        const newWeekplan = new Weekplan({
            user: req.user.id,
            image: req.user.image,
            text: req.body.text,
            name: req.body.name,
            monday: req.body.monday,
            tuesday: req.body.tuesday,
            wednesday: req.body.wednesday,
            thursday: req.body.thursday,
            friday: req.body.friday,
            saturday: req.body.saturday,
            sunday: req.body.sunday
        });
        newWeekplan.save().then(plan => res.json(plan));
});

module.exports = router;