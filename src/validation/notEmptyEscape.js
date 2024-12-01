const { body, validationResult } = require("express-validator");

const validateLogin = (validate) => {
  return body(validate).notEmpty().escape().withMessage("field shouldn't empty");
};

const validateRegister = (validate) => {
  return body(validate).notEmpty().escape().withMessage("field shouldn't empty");
};

const validateResult = (req) => {
  return validationResult(req);
};

module.exports = {
  validateLogin,
  validateRegister,
  validateResult,
};
