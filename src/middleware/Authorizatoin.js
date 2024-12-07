const jwt = require("jsonwebtoken");
const response = require("../skemaResponse");
const {
  searchRefreshToken,
  deleteRefreshToken,
  findUser,
} = require("../models/User");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return response(res, {
      status: 400,
      message: "no token found in auth request header",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (!findUser(user?.email)) {
      return response(res, {
        status: 403,
        message: "user not exist",
      });
    }
    if (err)
      return response(res, {
        status: 403,
        message: "access token has expired or is invalid",
      });
    console.log(user);
    req.user = user;
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
    return response(res, { status: 403, message: "user has been logged out" });
  }

  const payload = {
    id: user[0].id,
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

const logout = async (refreshToken, res) => {
  const user = await searchRefreshToken(refreshToken) ?? '';
  try {
    jwt.verify(
      user.refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          response(res, { status: 403, message: "invalid refresh token" });
        } else {
          await deleteRefreshToken(decoded.id);
          response(res, { status: 200, message: "success logout" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    response(res, { status: 500, message: "internal server error" });
  }
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
  logout: logout,
};
