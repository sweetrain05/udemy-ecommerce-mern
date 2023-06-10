import User from "../models/user.js";

export const register = async (req, res) => {
    try {
        const user = await new User(req.body);
        user.save();
        res.json(user);
    } catch (err) {
        console.log(err);
    }
};
