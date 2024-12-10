const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const dashboard = require('./controller/dashboard');

const bodyParser = require("body-parser");
const response = require("./skemaResponse");
const {
  authenticateToken,
  refreshToken,
  logout,
} = require("./middleware/Authorizatoin");

app.use(bodyParser.json());
app.use(logger);
app.use("/login", loginRoute);
app.use("/register", registerRoute);

function logger(req, res, next) {
  console.log(`[${new Date().toLocaleString()}] - ${req.method} ${req.path}`);
  next();
}

app.get("/", (req, res) => {
  response(res, { status: 200, message: "Success" }, "Halaman Homepage");
});

app.get("/dashboard", authenticateToken, async (req, res) => {
  const data = await dashboard();
  response(res, { status: 200, message: "Success", payload: data });
});

app.get("/dashboard/profile", (req, res) => {
  response(res, 200, "Halaman Profile");
});

app.post("/token", (req, res) => {
  refreshToken(req, res);
});

app.delete("/logout", async (req, res) => {
  await logout(req.body.token, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
