import { Router } from "express";
import register from "../controllers/register.controller.js";
import login from "../controllers/login.controller.js";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/auth.middleware.js";
const router = Router();
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

export default router;
