import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send({ test: "test" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
