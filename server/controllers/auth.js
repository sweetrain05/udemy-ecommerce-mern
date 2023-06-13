import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
    try {
        // 1. destructure name, email, pw from req.body
        const { name, email, password } = req.body;

        // 2. all fields required validation
        if (!name.trim()) {
            return res.json({ error: "Name is required" });
        }
        if (!email) {
            return res.json({ error: "Email is required" });
        }
        if (!password || password.length < 6) {
            return res.json({
                error: "Password must be at least 6 characters long",
            });
        }

        // 3. check if email is taken
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.json({ error: "Email is taken" });
        }

        // 4. hash password
        const hashedPassword = await hashPassword(password);

        // 5. register user
        const user = await new User({
            name,
            email,
            password: hashedPassword,
        }).save();

        // 5.1 create signed jwt
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // 6. send response
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            token,
        });
    } catch (err) {
        console.log(err);
    }
};

export const login = async (req, res) => {
    try {
        // 1. destructure email, pw from req.body
        const { email, password } = req.body;

        // 2. all fields required validation
        if (!email) {
            return res.json({ error: "Email is required" });
        }
        if (!password || password.length < 6) {
            return res.json({
                error: "Password must be at least 6 characters long",
            });
        }

        // 3. check if it is an existing user
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json({ error: "User not found" });
        }

        // 4. compare password
        const match = await comparePassword(password, user.password); // 여기서 user.password는 DB에 있던 hashed pw를 반환한다.
        if (!match) {
            return res.json({ error: "Wrong Password" });
        }

        // 5.1 create signed jwt
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // 6. send response
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            token,
        });
    } catch (err) {
        console.log(err);
    }
};

export const secret = async (req, res) => {
    res.json({ currentUser: req.user });
};
