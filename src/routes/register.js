const express = require("express");
const router = express.Router();

const { validateRegister } = require("../validation/notEmptyEscape");
const handleRegister = require("../controller/register");
const response = require("../skemaResponse");

router.get("/", (req, res) => {
  response(res, { status: 200, message: "Success", payload: [] });
});

router.post(
  "/",
  validateRegister(["username", "password", "email"]),
  async (req, res) => {
    const data = await handleRegister(req, res);
    response(res, data);
  }
);

module.exports = router;
