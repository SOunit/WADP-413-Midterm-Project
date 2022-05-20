import express from "express";
import path from "path";
import routes from "./routes";
import bodyParser from "body-parser";
import db from "./services/mongo";
import Blog from "./models/blog";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

const BLOG_DATA_LIST = [
  { _id: "1", title: "title 1" },
  { _id: "2", title: "title 2" },
  { _id: "3", title: "title 3" },
];

app.use((req, res, next) => {
  (req as any).blogList = BLOG_DATA_LIST;

  next();
});

app.use(routes);

const PORT = process.env.PORT || 8000;

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`listening on ${PORT}`);
    app.listen(PORT);
  }
});
