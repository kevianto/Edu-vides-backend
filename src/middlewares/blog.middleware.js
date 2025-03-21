import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Blog from "../models/Blog.js";

export const authenticateUser = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }
    token = token.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ success: false, message: "Server error: JWT secret missing" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(400).json({ success: false, message: "Invalid token" });
  }
};
export const authorizeBlogOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized to perform this action" });
    }

    next();
  } catch (error) {
    console.error("Authorization Error:", error.message);
    return res.status(500).json({ success: false, message: "Authorization error" });
  }
};
