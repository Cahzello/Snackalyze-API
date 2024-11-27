const { body, validationResult } = require("express-validator");

const validateLogin = (validate) => {
 return body(validate).notEmpty().escape();
};

const validateResult = (req) => {
  return validationResult(req);
};

module.exports = {
    validateLogin: validateLogin,
    validateResult: validateResult
};

