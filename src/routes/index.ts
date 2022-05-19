import express from "express";

const router = express.Router();

// FIXME: set proper type to request object
router.get("/", (req, res) => {
  res.render("list", { blogList: (req as any).BLOG_DATA_LIST });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  res.redirect("/");
});

export default router;
