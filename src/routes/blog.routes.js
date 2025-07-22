import express from "express";
import { upload } from "../middlewares/multerConfig.js";
import {addBlog,getUserBlogs,getAllBlogs,getBlogById,updateBlog,removeBlog,} from "../controllers/blog.controller.js";
import {authenticateUser, authorizeBlogOwner,} from "../middlewares/blog.middleware.js";

const router = express.Router();

router.post("/", authenticateUser, upload.single("image"),  addBlog);
router.get("/user", authenticateUser, getUserBlogs);
router.get("/",  getAllBlogs);
router.get("/:id",  getBlogById); // Assuming this is to get a single blog by ID
router.put("/:id", authenticateUser, authorizeBlogOwner, upload.single("image"), updateBlog);
router.delete("/:id", authenticateUser, authorizeBlogOwner, removeBlog);

export default router;
