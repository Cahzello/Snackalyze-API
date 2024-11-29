const { matchedData, validationResult } = require("express-validator");
const registing = require("../models/User");

const handleRegister = async (req, res) => {
  const result = validationResult(req);
  const { username, password } = matchedData(req);
  const token = req.get("Authorization");

  const user = await registing();
  return user;
  // if (result.isEmpty()) {
  //   if (user) {
  //     return {
  //       status: 200,
  //       message: "Success",
  //     };
  //   } else {
  //     return {
  //       status: 401,
  //       message: "Unauthorized",
  //     };
  //   }
  // } else {
  //   return {
  //     status: 400,
  //     message: "Bad Request",
  //   };
  // }
};

module.exports = handleRegister;
