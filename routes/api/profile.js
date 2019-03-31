const express = require('express');
const router = express.Router();
//Models
const Profile = require('../../models/Profile');
const User = require('../../models/User');
//DB
const mongoose = require('mongoose');
//use for protected routes
const passport = require('passport');

//@route  GET api/profile/:id
//@desc   Returns the current users profile
//@access private
router.get('/', passport.authenticate('jwt', {session: false}), (req,res) =>{
  const errors = {};

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



//make this specific router accessible
module.exports = router;