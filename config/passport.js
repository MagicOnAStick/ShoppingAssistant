const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
//this uses the rest auth header and reads the bearer token from it
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

//passport parameter passed from server.js
module.exports = passport => {
  //jwt payload is the information (payload property) stored inside the jwt token
  passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
    User.findById(jwt_payload.id)
    .then(user =>  {
      if(user){
        return done(null, user);
      }
      return done(null,false);
    })
    .catch(err => console.log(err));
  }));
};