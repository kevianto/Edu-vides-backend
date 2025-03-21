import express from "express";
import { upload } from "../middlewares/multerConfig.js";
import {addBlog,getUserBlogs,getAllBlogs,updateBlog,removeBlog,} from "../controllers/blog.controller.js";
import {authenticateUser, authorizeBlogOwner,} from "../middlewares/blog.middleware.js";

const router = express.Router();

router.post("/", authenticateUser, upload.single("image"),  addBlog);
router.get("/user", authenticateUser, getUserBlogs);
router.get("/",  getAllBlogs);
router.put("/:id", authenticateUser, authorizeBlogOwner, upload.single("image"), updateBlog);
router.delete("/:id", authenticateUser, authorizeBlogOwner, removeBlog);

export default router;
