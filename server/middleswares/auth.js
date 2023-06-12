import jwt from "jsonwebtoken";

export const requireSignin = (req, res, next) => {
    try {
        const decoded = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        console.log("decoded => ", decoded);
        req.user = decoded;
    } catch (err) {
        // 401 error status는 unauthorized를 나타냄
        return res.status(401).json(err);
    }
    next();
};
