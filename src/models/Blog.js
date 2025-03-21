import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String  }, // Image URL or Base64
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
