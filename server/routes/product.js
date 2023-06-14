import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middlewares
import { isAdmin, requireSignin } from "../middleswares/auth.js";

// controllers
import { create, list, read, photo } from "../controllers/product.js";

router.post("/product", requireSignin, isAdmin, formidable(), create);
router.get("/products", list);
router.get("/product/:slug", read);
router.get("/product/photo/:productId", photo);

export default router;
