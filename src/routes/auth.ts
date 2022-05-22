import express from "express";
import User from "../models/user";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const user = new User(email, password);

  try {
    await user.save();
    (req.session as any).isLoggedIn = true;
    res.redirect("/");
  } catch (err) {
    (req.session as any).isLoggedIn = false;
    res.send({ message: (err as any).message });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.getUserByEmailAndPassword(email, password);
  if (!user) {
    return res.redirect("/");
  }

  (req.session as any).isLoggedIn = true;
  res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {});
  res.redirect("/");
});

export default router;
