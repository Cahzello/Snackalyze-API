const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");

const bodyParser = require("body-parser");
const response = require("./skemaResponse");

app.use(bodyParser.json());
app.use(logger);
app.use("/login", loginRoute);
app.use("/register", registerRoute);

function logger(req, res, next) {
  console.log(`[${new Date().toLocaleString()}] - ${req.method} ${req.path}`);
  next();
}

app.get("/", (req, res) => {
  response(res, {status: 200, message: "Success"}, "Halaman Homepage");
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
