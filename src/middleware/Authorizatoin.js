const jwt = require("jsonwebtoken");
const response = require("../skemaResponse");
const { searchRefreshToken } = require("../models/User");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return response(res, {
      status: 400,
      message: "no token found in auth request header",
    });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err?.message);
    if (err)
      return response(res, {
        status: 403,
        message: "access token has expired or is invalid",
      });
    req.user = user;
    console.log(req.user);
    next();
  });
};

const refreshToken = async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) {
    return response(res, {
      status: 400,
      message: "no token found in request body",
    });
  }

  const user = await searchRefreshToken(refreshToken);
  if (user.length === 0) {
    return response(res, { status: 403, message: "no match" });
  }

  const payload = {
    username: user[0].username,
    email: user[0].email,
  };

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
    if (err) {
      response(res, { status: 403, message: "invalid refresh token" });
    } else {
      const accessToken = createToken(payload);
      res.status(200).json({ accessToken: accessToken });
    }
  });
};

const createToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

module.exports = {
  authenticateToken: authenticateToken,
  refreshToken: refreshToken,
  createToken: createToken,
};
