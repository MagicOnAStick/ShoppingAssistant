const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.from = !isEmpty(data.from) ? data.from : '';


  if (Validator.isEmpty(data.title)) {
    errors.title = 'Email field is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description is required';
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'From Date is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};