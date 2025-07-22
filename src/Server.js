import express from "express";
import cors from "cors";
import AuthRoutes from "./routes/auth.routes.js";
import BlogRoutes from "./routes/blog.routes.js";
import ConnectToDB from "./config/db.js";
import dotenv from "dotenv";    
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const allowedOrigins = [
  'https://edu-frontend-b3ut3.vercel.app',
  'http://localhost:5173','https://edu-six-tan.vercel.app'
];
app.use(
  cors({
     origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/auth", AuthRoutes);
app.use("/blog", BlogRoutes);
app.listen(PORT, async () => {
  await ConnectToDB();
  console.log(`app running at http://localhost:${PORT}`);
});
