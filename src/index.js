const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const response = require("./skemaResponse");
const handleLogin = require("./controller/login");
const handleRegister = require("./controller/register");
const {
  validateLogin,
  validateRegister,
} = require("./validation/notEmptyEscape");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(res, 200, "Halaman Homepage");
});

app.get("/login", (req, res) => {
  response(res, 200, "Halaman Login");
});

/**
 * This fn checks the request body for the presence of username and password and sanitizes them.
 * If it is present, it will return a 200 OK response with the message "Success".
 * If it is not present, it will return a 400 Bad Request response with the message "Bad Request".
 **/
app.post("/login", validateLogin(["username", "password"]), (req, res) => {
  const status = handleLogin(req);
  const data = null;
  response(res, status, data);
});

app.get("/register", validateRegister(["username", "password"]), (req, res) => {
  handleRegister(req, res);
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
