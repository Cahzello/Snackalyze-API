const { matchedData, validationResult } = require("express-validator");
const { Prisma } = require("@prisma/client");
const { registing, login } = require("../models/User");

const handleRegister = async (req, res) => {
  const result = validationResult(req);
  const { username, password, email } = matchedData(req);

  const newUser = {
    username: username,
    password: password,
    email: email,
  };

  if (result.isEmpty()) {
    try {
      const user = await registing(newUser);
      return {
        status: 200,
        message: "Success",
        payload: {
          createUserStatus: true,
          user: ''
        },
      };
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const formatErr = {
          errorCode: err.code,
          meta: err.meta,
          clientVersion: err.clientVersion,
        };
        return {
          status: 400,
          message: "Bad Request",
          payload: formatErr,
        };
      } else {
        return {
          status: 401,
          message: "Unauthorized",
          payload: null,
        };
      }
    }
  } else {
    return {
      status: 400,
      message: "Bad Request",
      payload: result,
    };
  }
};

module.exports = handleRegister;
