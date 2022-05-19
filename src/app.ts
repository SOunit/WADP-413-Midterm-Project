import express from "express";
import path from "path";
import routes from "./routes";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  (req as any).BLOG_DATA_LIST = [
    { _id: "1", title: "1" },
    { _id: "2", title: "2" },
    { _id: "3", title: "3" },
  ];

  next();
});

app.use(routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
