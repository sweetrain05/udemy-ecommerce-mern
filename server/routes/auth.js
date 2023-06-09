import express from "express";

const router = express.Router();

import { users } from "../controllers/auth.js";
router.get("/users", users);

export default router;
