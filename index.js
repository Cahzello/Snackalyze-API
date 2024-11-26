const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/products", async (req, res) => {
  const data = await fetch('https://dummyjson.com/products?limit=5')
  .then(response => response.json());
  res.status(200).send(data);
});

app.get("/", (req, res) => {
  res.status(200).send(`"Hello World!"`);
});

app.post("/", (req, res) => {
  console.log({ FromQuery: req.query, FromRequestBody: req.body });
  res.status(200).send("Method post succesfully");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
