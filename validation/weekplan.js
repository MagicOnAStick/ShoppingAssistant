const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateWeekplanTextInput(data) {
  let errors = {};

  //TODO validate recipe ids here (are they existing?)

  data.text = !isEmpty(data.text) ? data.text : '';

  if(!Validator.isLength(data.text, {min: 10, max: 5000})){
    errors.text = 'Weekplan description text must be between 10 and 5000 characters';
  }

  data.name = !isEmpty(data.name) ? data.name : '';
  if(!Validator.isLength(data.name, {min: 1, max: 50})){
    errors.name = 'Weekplan name must be between 1 and 50 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};