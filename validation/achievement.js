const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAchievementInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.text = !isEmpty(data.text) ? data.text : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};