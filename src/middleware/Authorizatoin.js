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

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    const userIsExist = await findUser(user?.email);
    if (!userIsExist) {
      return response(res, {
        status: 403,
        message: "user not exist",
      });
    }
    if (!userIsExist.refreshToken) {
      return response(res, {
        status: 403,
        message: "unauthorized",
      });
    }
    if (err)
      return response(res, {
        status: 403,
        message: "access token has expired or is invalid",
      });
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

  const user = (await searchRefreshToken(refreshToken)) ?? null;
  if (!user) {
    return response(res, {
      status: 403,
      message: "cannot make refresh token. user is logged out",
    });
  }

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
    if (err) {
      response(res, { status: 403, message: "invalid refresh token" });
    } else {
      const accessToken = createToken(payload);
      response(res, {
        status: 200,
        message: "success refresh token",
        payload: { accessToken: accessToken },
      });
    }
  });
};

const logout = async (refreshToken, res) => {
  refreshToken ?? null;
  if (refreshToken == null) {
    return response(res, { status: 400, message: "no token found in request body" });
  }
  const user = (await searchRefreshToken(refreshToken)) ?? "";
  console.log(user);
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
