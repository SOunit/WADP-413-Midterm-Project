import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // FIXME
  if (email === "t@t.com" && password === "password") {
    (req.session as any).isLoggedIn = true;
  }

  res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {});
  res.redirect("/");
});

export default router;
