const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).send(`"Hello World!"`);
});

app.post("/", (req, res) => {
  console.log({ FromRequestBody: req.body, FromParams: req.query });
  res.status(200).send("Method post succesfully");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
