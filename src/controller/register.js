const { matcheddata, validationResult } = require("express-validator");

const handleRegister = (req, res) => {
  const result = validationResult(req);
  const { username, password } = matcheddata(req);
  const token = req.get("Authorization");

  if (result.isEmpty()) {
    const user = registing(username, password, token);
    if (user) {
      return {
        status: 200,
        message: "Success",
      };
    } else {
      return {
        status: 401,
        message: "Unauthorized",
      };
    }
  } else {
    return {
      status: 400,
      message: "Bad Request",
    };
  }
};

module.exports = handleRegister;
