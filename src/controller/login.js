const { validationResult, matchedData } = require("express-validator");
const jwt = require("jsonwebtoken");
const { findUser, updateRefreshToken } = require("../models/User");
const { compare } = require("bcrypt");
const { createToken } = require("../middleware/Authorizatoin");

const handleLogin = async (req) => {
  const result = validationResult(req);
  const { email, password } = matchedData(req);

  if (!result.isEmpty()) {
    return {
      status: 400,
      message: "Bad Request",
      payload: null,
    };
  }

  try {
    const user = await findUser(email);
    const isMatch = await compare(password, user.password);
    if (isMatch) {
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      const accessToken = createToken(userData);
      const refreshToken = jwt.sign(userData, process.env.REFERSH_TOKEN_SECRET);
      updateRefreshToken(user.email, refreshToken);

      return {
        status: 200,
        message: "Success",
        payload: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      };
    } else {
      return {
        message: "Bad Request",
        status: 400,
        payload: {
          errMessage: "email or password must be correct",
        },
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: "Internal Server Error",
      payload: null,
    };
  }
};

module.exports = handleLogin;
