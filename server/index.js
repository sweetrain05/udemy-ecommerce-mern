import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js"; // node에서는 js를 붙인 full file name을 적어야 한다.
import router from "./routes/auth.js";

// const express = require("express");

dotenv.config();

const app = express(); // app = instance of express app

// 몽구스를 통한 몽고디비 연결
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB ERROR => ", err));

// process란 백엔드의 DOM 같은 존재
//console.log("process =>", process);

// router middleware

app.use(authRoutes);

// process.env에서 PORT가 있으면 그것을 가져오고, 없으면 8000 소환.
const port = process.env.PORT || 8000;

// 8000 local port에서 가져오기.
app.listen(port, () => {
    console.log(`Node server is running on port ${port}`);
});
