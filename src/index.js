const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const response = require("./skemaResponse");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  response(res, 200, "Halaman Homepage");
});

app.get("/login", (req, res) => {
  response(res, 200, "Halaman Login");
});

app.post("/login", (req, res) => {
  
  response(res, 200, "Halaman Login");
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
