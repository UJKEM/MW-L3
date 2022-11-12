const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function cribInputValidate(data) {
  data.name = !isEmpty(data.name.toLowerCase()) ? data.name : "";

  data.img = !isEmpty(data.img.toLowerCase()) ? data.img : "";

  data.location = !isEmpty(data.location.toLowerCase()) ? data.location : "";

  let errors = {};

  if (validator.isEmpty(data.name.toLowerCase())) {
    errors.name = "Please enter a name";
  }

  if (validator.isEmpty(data.img.toLowerCase())) {
    errors.img = "Please enter img address";
  }

  if (validator.isEmpty(data.location.toLowerCase())) {
    errors.location = "Please enter a location";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
