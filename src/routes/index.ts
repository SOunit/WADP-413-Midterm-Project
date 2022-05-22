import express from "express";
import { ObjectId } from "mongodb";
import Blog from "../models/blog";

const router = express.Router();

// FIXME: set proper type to request object
router.get("/", async (req, res) => {
  const blogList = await Blog.getBlogList();

  console.log("blogList", blogList);

  res.render("list", { blogList });
});

router.get("/create", (req, res) => {
  res.render("create", { blog: {} });
});

router.post("/create", async (req, res) => {
  const { title } = req.body;

  const blog = new Blog(title, []);
  await blog.save();

  res.redirect("/");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.getBlogById(id);

  res.render("edit", { blog });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const blog = await Blog.getBlogById(id);

  if (!blog) {
    return;
  }

  new Blog(title, blog.comments, new ObjectId(id)).updateBlog();

  res.redirect("/");
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;

  await Blog.deleteBlogById(id);

  res.redirect("/");
});

router.get("/comment/:id", async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.getBlogById(id);

  res.render("comment", { blog });
});

router.post("/comment/:id", async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const blog = await Blog.getBlogById(id);

  if (!blog) {
    return;
  }
  blog.comments.push(comment);

  await new Blog(blog.title, blog.comments, blog._id).updateBlog();

  res.redirect("/");
});

export default router;
