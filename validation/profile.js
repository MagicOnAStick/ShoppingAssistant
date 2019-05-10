const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  //if a value is undefined or null it gets transformed to '' to check it via isEmpty
  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';  

  if(!validator.isLength(data.handle,2,40)){
    errors.handle = "Handle needs to be 2 and 40 characters";
  }

  if(validator.isEmpty(data.handle)){
    errors.handle = "Profile handle is required!";
  }

  if(validator.isEmpty(data.status)){
    errors.status = "Status field is required!";
  }

  if(!isEmpty(data.youtube)){
    if(!validator.isURL(data.youtube)){
      errors.youtube = 'Not a valid Youtube URL';
    }
  }

  if(!isEmpty(data.facebook)){
    if(!validator.isURL(data.facebook)){
      errors.facebook = 'Not a valid Youtube URL';
    }
  }

  if(!isEmpty(data.instagram)){
    if(!validator.isURL(data.instagram)){
      errors.instagram = 'Not a valid Youtube URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};