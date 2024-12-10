const express = require("express");
const router = express.Router();

const getAllergy = require("../controller/dashboard");
const { authenticateToken } = require("../middleware/Authorizatoin");
const response = require("../skemaResponse");

router.get("/", authenticateToken, async (req, res) => {
  const data = await getAllergy(req, res);
  response(res, { status: 200, message: "Success", payload: data });
});

router.post("/", authenticateToken, async (req, res) => {
  response(res, { status: 200, message: "Success" });
});

module.exports = router;
