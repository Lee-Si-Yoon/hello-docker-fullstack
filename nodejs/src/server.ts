import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get("/nodejs/hi", function (req, res) {
  res.status(200).send({ ok: true });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
