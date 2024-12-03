const { validationResult, matchedData } = require("express-validator");
const jwt = require("jsonwebtoken");
const { findUser, updateRefreshToken } = require("../models/User");
const { compare } = require("bcrypt");

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

const createToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

module.exports = handleLogin;
