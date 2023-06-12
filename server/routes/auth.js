import express from "express";

const router = express.Router();

// controllers
import { register, login } from "../controllers/auth.js";
router.post("/register", register);
router.post("/login", login);

//middlewares
import { requireSignin } from "../middleswares/auth.js";

// testing
router.get("/secret", requireSignin, (req, res) => {
    res.json({ AuthorizedUser: req.user });
});

export default router;
