import express from "express";

const router = express.Router();

// FIXME: set proper type to request object
router.get("/", (req, res) => {
  res.render("list", { blogList: (req as any).blogList });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  res.redirect("/");
});

router.get("/create", (req, res) => {
  res.render("create", { blog: {} });
});

router.post("/create", (req, res) => {
  const { title } = req.body;

  (req as any).blogList.push({ id: Math.random(), title });

  res.redirect("/");
});

router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);

  res.render("edit", { blog: (req as any).blogList[0] });
});

router.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  (req as any).blogList[0].title = title;

  res.redirect("/");
});

router.get("/delete/:id", (req, res) => {
  const { id } = req.params;

  res.redirect("/");
});

export default router;
