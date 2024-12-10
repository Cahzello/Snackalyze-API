const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const dashboardRoute = require("./routes/dashboard");
const profileRoute = require("./routes/profile");

const bodyParser = require("body-parser");
const response = require("./skemaResponse");
const { refreshToken, logout } = require("./middleware/Authorizatoin");

app.use(bodyParser.json());
app.use(logger);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/dashboard", dashboardRoute);
app.use("/profile", profileRoute);


function logger(req, res, next) {
  console.log(`[${new Date().toLocaleString()}] - ${req.method} ${req.path}`);
  next();
}

app.get("/", (req, res) => {
  response(res, { status: 200, message: "Success" }, "Halaman Homepage");
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
