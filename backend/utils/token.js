import jwt from "jsonwebtoken";

export default function generateToken(user, res) {
    const token = jwt.sign({user}, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("jwt", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });
};
