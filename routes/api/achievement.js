const express = require('express');
const router = express.Router();
const passport = require('passport');

const Achievement = require('../../models/Achievement');
const validateAchievementInput = require('../../validation/achievement');

// @route GET api/achievement/:id
// @desc  Get achievement by id
// @access public
router.get('/:id', (req,res) => {
    Achievement.findById(req.params.id)
    .then(achievement => res.json(achievement))
    .catch(() => {
        res.status(404).json({noachievementfound: 'no achievement found with that id'});
    });
});

// @route GET api/achievement
// @desc  Get all achievements
// @access public
router.get('/', (req,res) => {
    Achievement.find()
    .sort({date: -1})
    .then(achievements => res.json(achievements))
    .catch(() => {
        res.status(404).json({noachievementsfound: 'no achievements found'});
    });
});

// @route delete api/achievement/:id
// @desc  delete achievement by id
// @access private
router.delete('/:id', passport.authenticate('jwt',{ session: false }), (req,res) => {
        
    Achievement.findById(req.params.id)
            .then(achievement => {
                //check if recipe owner is the current user
                if(achievement.user.toString() !== req.user.id){
                    return res.status(401).json({notauthorized: 'user not authorized to delete achievement'});
                }
                achievement.remove().then(() => res.json({success: true}));
            }).catch(() => res.status(404).json({plannotfound: 'no achievement found with this id'}))
});

// @route update api/achievement/:id
// @desc  update achievement by id
// @access private
router.put('/:id', passport.authenticate('jwt',{ session: false }), (req,res) => {

    Achievement.findById(req.params.id)
        .then(achievement => {
            //check if recipe owner is the current user
            if(achievement.user.toString() !== req.user.id){
                return res.status(401).json({notauthorized: 'user not authorized to modify achievement'});
            }
            achievement.updateOne({$set : req.body})
            .then(() => res.json({success: true}));
            //do not need to update the profiles weekplan because it already holds a reference to the updates weekplan
        }).catch(() => res.status(404).json({achievementnotfound: 'no achievement found with this id'}))
});

// @route POST api/achievement
// @desc  Create a new achievement
// @access private 
router.post('/', passport.authenticate('jwt',{ session: false }), (req,res) =>{
        const {errors, isValid} = validateAchievementInput(req.body);

        if(!isValid){
            return res.status(400).json({achievementvalidationerror: errors});
        }

        const newAchievement = new Achievement({
            user: req.user.id,
            text: req.body.text,
            name: req.body.name
        });
        newAchievement.save().then(achievement => res.json(achievement));
});

module.exports = router;