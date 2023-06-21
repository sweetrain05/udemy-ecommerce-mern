import express from "express";

const router = express.Router();

// controllers
import { register, login, secret } from "../controllers/auth.js";
router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignin, (req, res) => {
    res.json({ ok: true });
});

//middlewares
import { requireSignin, isAdmin } from "../middleswares/auth.js";

// testing
router.get("/secret", requireSignin, isAdmin, secret);
router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
    res.json({ ok: true });
});

export default router;
