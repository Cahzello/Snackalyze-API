const express = require("express");
const router = express.Router();

const { validateRegister } = require("../validation/notEmptyEscape");
const handleRegister = require("../controller/register");
const response = require("../skemaResponse");

router.get("/", (req, res) => {
  response(res, {status: 200, message: "Success"}, "Halaman register");
});

/**
 * Handle registing new user
 * return a automatic redirect resonse to dashboard page
 */
router.post("/", validateRegister(["username", "password"]), (req, res) => {
  handleRegister(req, res);
  response(res, {status: 200, message: "Success"}, "Halaman register");
});

module.exports = router;
