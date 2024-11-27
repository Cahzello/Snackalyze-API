const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const response = require("./skemaResponse");
const handleLogin = require("./controller/login");
const { body } = require("express-validator");
const { validateLogin, validateResult } = require("./validation/login");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(res, 200, "Halaman Homepage");
});

app.get("/login", (req, res) => {
  response(res, 200, "Halaman Login");
});

app.post("/login", validateLogin(["username", "password"]), (req, res) => {
  const resultValidation = validateResult(req);
  const data = handleLogin(req, resultValidation);
  response(res, data, "");
});

app.get("/register", (req, res) => {
  response(res, 200, "Halaman register");
});

app.get("/dashboard", (req, res) => {
  response(res, 200, "Halaman Dashboard");
});

app.get("/dashboard/profile", (req, res) => {
  response(res, 200, "Halaman Profile");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
