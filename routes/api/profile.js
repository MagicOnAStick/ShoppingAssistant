const express = require('express');
const router = express.Router();

//load validatoin
const validateProfileInput = require('../../validation/profile');

//Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');
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
    .then(profile => {
      if(!profile){
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    }) 
    .catch(err => res.status(404).json(err));
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
    if(req.body.company) profileFields.company = req.body.company;
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

//make this specific router accessible
module.exports = router;