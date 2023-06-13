import express from "express";

const router = express.Router();

// controllers
import { register, login, secret } from "../controllers/auth.js";
router.post("/register", register);
router.post("/login", login);

//middlewares
import { requireSignin, isAdmin } from "../middleswares/auth.js";

// testing
router.get("/secret", requireSignin, isAdmin, secret);

export default router;
