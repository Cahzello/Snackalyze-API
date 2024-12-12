const { matchedData, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { Prisma } = require("@prisma/client");
const { registing } = require("../models/User");
const { createAllergy } = require("../models/Allergy");

const handleRegister = async (req, res) => {
  const result = validationResult(req);
  const { username, password, password2, email } = matchedData(req);
  const saltRounds = await bcrypt.genSalt();

  const hashPassword = await bcrypt.hash(password, saltRounds);

  const newUser = {
    username: username,
    password: hashPassword,
    email: email,
  };

  if (!result.isEmpty()) {
    return {
      status: 400,
      message: "Bad Request",
      payload: [],
    };
  }

  if (password !== password2) {
    return {
      status: 400,
      message: "Bad Request",
      payload: {
        errrMessage: "username and username2 must be same",
      },
    };
  }

  try {
    const user = await registing(newUser);
    await createAllergy(user.id, []);
    return {
      status: 201,
      message: "Success Created",
      payload: {
        createUserStatus: true,
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
};

module.exports = handleRegister;
