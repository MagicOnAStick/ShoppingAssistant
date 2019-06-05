const express = require('express');
const router = express.Router();

//load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');


//Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Weekplan = require('../../models/Weekplan');
const Achievement = require('../../models/Achievement');

//DB
const mongoose = require('mongoose');
//use for protected routes
const passport = require('passport');

//@route  GET api/profile
//@desc   Returns the current users profile
//@access private
router.get('/', passport.authenticate('jwt', {session: false}), (req,res) =>{
  const errors = {};

  //on successfull authentication passport adds the tokens payload data to the request, so req.user is accessible because passport.js adds it as "user"
  Profile.findOne({user: req.user.id})
    .populate('user',['name','avatar'])
    .then(profile => {
      if(!profile){
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    }) 
    .catch(err => res.status(404).json(err));
});

//@route  GET api/profile/all
//@desc   Returns all profiles
//@access public
router.get('/all', (req,res) => {
  Profile.find()
  .populate('user',['name','avatar'])
  .then(profiles => {
    if(!profiles){
      return res.status(404).json({errors: 'There are no profiles'});
    }

    return res.json(profiles);
  })
  .catch(err => 
    res.status(404).json({profile: 'There are no profiles'}));
});

//@route  GET api/profile/handle/:handle
//@desc   Return profile with the passed handle
//@access public
router.get('/handle/:handle', (req,res) => {
  const errors = {};
  
  Profile.findOne({ handle: req.params.handle })
  .populate('user',['name','avatar'])
  .then(profile => {
    if(!profile){
      errors.noprofile = 'There is no profile for this user!'
      return res.status(404).json(errors);
    }
    return res.json(profile);
  })
  .catch(err => res.status(404).json(err));
});

//@route  GET api/profile/user/:user_id
//@desc   get profile by user id
//@access public
router.get('/user/:user_id', (req,res) => {
  const errors = {};
  
  Profile.findOne({ user: req.params.user_id })
  .populate('user',['name','avatar'])
  .then(profile => {
    if(!profile){
      errors.noprofile = 'There is no profile for this user!'
      res.status(404).json(errors);
    }
    res.json(profile);
  })
  .catch(err => res.status(404).json({profile: 'There is no profile for this user'}));
});

//@route  POST api/profile
//@desc   create or edit the current users profile
//@access private
router.post('/', passport.authenticate('jwt', {session: false}),
 (req,res) =>{
    
    const {errors, isValid} = validateProfileInput(req.body);

    if(!isValid){
      return res.status(400).json(errors);
    }
    
    // get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.goal) profileFields.goal = req.body.goal;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.status) profileFields.status = req.body.status;

    //split preferences list into array
    if(typeof req.body.preferences != 'undefined') profileFields.preferences = req.body.preferences.split(',');
    if(req.body.bio) profileFields.bio = req.body.bio;

    //social object inside profileFields object
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    if(req.body.date) profileFields.date = req.body.date;

    Profile.findOne({user: req.user.id})
    .then(profile => {
      if(profile){
        //update profile if existing
        Profile.findOneAndUpdate({user: req.user.id}, {$set : profileFields}, {new : true})
        .then(profile => res.json(profile));
      } else{
        //create new profile if not existing

        //check if handle exists
        Profile.findOne({handle: profileFields.handle})
        .then(profile =>{
          if(profile){
            errors.handle = 'Handle already exists - please choose another handle!';
            res.status(400).json(errors)
          }
          //save profile
          new Profile(profileFields)
          .save()
          .then(profile => {
            res.json(profile);
          });
        })
      }
    })
  }
);

//@route  POST api/profile/experience
//@desc   add experience to profile
//@access private (user required)
router.post('/experience', passport.authenticate('jwt', {session: false}), (req,res) =>{
  
  const {errors, isValid} = validateExperienceInput(req.body);

    if(!isValid){
      return res.status(400).json(errors);
    }
  
  Profile.findOne({user: req.user.id})
    .then(profile => {
      const newExp = {
        title: req.body.title,
        description: req.body.description,
        from: req.body.from
      }

      //add to experience array within profile
      profile.experience.unshift(newExp); //unshift adds the element at the beginning of the array
      profile.save().then(profile => res.json(profile));
    })
});

//@route  DELETE api/profile/experience:exp_id
//@desc   delete experience from profile
//@access private (user required)
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req,res) =>{
  
  Profile.findOne({user: req.user.id})
    .then(profile => {
      //Get remove index
      const removeIndex = profile.experience
      .map(item => item.id) //returns each .id from experiences and compares them with the param id
      .indexOf(req.params.exp_id);

      //splice out of array
      profile.experience.splice(removeIndex,1);
      //save
      profile.save()
      .then(res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

//@route  POST api/profile/weekplan
//@desc   add weekplan to profile
//@access private (user required)
router.post('/weekplan/:weekplan_id', passport.authenticate('jwt', {session: false}), (req,res) =>{
  
  Profile.findOne({user: req.user.id})
    .then(profile => {
      
      Weekplan.findById(req.params.weekplan_id)
      .then(plan =>{

        profile.current_weekplan = plan;
        profile.save().then(profile => res.json(profile));
      });
    });
});

//@route  POST api/profile/achievement
//@desc   add achievement to profile
//@access private (user required)
router.post('/achievement/:achievement_id', passport.authenticate('jwt', {session: false}), (req,res) =>{
  
  Profile.findOne({user: req.user.id})
    .then(profile => {
      
      Achievement.findById(req.params.achievement_id)
      .then(achievement =>{

        profile.achievements.unshift(achievement); //unshift adds the element at the beginning of the array
        profile.save().then(profile => res.json(profile));
      });
    });
});

//@route  DELETE api/profile
//@desc   delete user and profile
//@access private (user required)
router.delete('/', passport.authenticate('jwt', {session: false}), (req,res) =>{
  Profile.findOneAndRemove({user : req.user.id})
  .then(profile => {
    profile.remove();    
    //delete user behind the profile
    User.findOneAndRemove({_id: req.user.id})
    .then(() => res.json({success: "true"}));
  });
});

//make this specific router accessible
module.exports = router;