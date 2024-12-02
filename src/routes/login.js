const express = require("express");
const router = express.Router();

const { validateLogin } = require("../validation/notEmptyEscape");
const handleLogin = require("../controller/login");
const response  = require("../skemaResponse");

router.get("/", (req, res) => {
  response(res, {status: 200, message: "Success", payload: []}, "Halaman Login");
});

/**
 * This fn checks the request body for the presence of username and password and sanitizes them.
 * If it is present, it will return a 200 OK response with the message "Success".
 * If it is not present, it will return a 400 Bad Request response with the message "Bad Request".
 **/
router.post("/", validateLogin(["username", "password"]), (req, res) => {
  const data = handleLogin(req);
  response(res, data);
});

module.exports = router;
