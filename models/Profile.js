const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    //collection to refer
    ref: 'users'
  },
  //for seo friendly url
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  preferences: {
    type: [String]
  },
  bio: {
    type: String
  },
  social: {
    youtube: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);