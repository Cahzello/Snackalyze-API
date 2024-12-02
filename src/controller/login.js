const { validationResult, matchedData } = require("express-validator");

const handleLogin = (req) => {
  const result = validationResult(req);
  const { username, password } = matchedData(req);

  if (result.isEmpty()) {
    try {

    } catch{
      
    }
  } else {
    return {
      status: 400,
      message: "Bad Request",
      payload: null,
    };
  }
};

module.exports = handleLogin;
