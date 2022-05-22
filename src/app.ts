import express from "express";
import path from "path";
import routes from "./routes";
import bodyParser from "body-parser";
import db from "./services/mongo";
import session from "express-session";
import authRoutes from "./routes/auth";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY!,
    name: "uniqueSessionID",
    saveUninitialized: false,
  })
);

app.use(authRoutes);

app.use((req, res, next) => {
  if (!(req.session as any).isLoggedIn) {
    return res.redirect("/login");
  }

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
