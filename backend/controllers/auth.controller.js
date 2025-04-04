import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";

export async function signUp(req, res) {
    try {
        const { name, username, password, confirmPassword } = req.body;

        if (password != confirmPassword) {
            return res.status(400).json({ error: "Passwords didn't match" });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const profilePic = "https://avatar.iran.liara.run/public";

        const newUser = new User({
            name,
            username,
            password: hash,
            profilePicture: profilePic,
        });

        if (newUser) {
            generateToken(newUser._id, res);

            await newUser.save();

            res.status(201).json(newUser);
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function signIn(req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        const correct = await bcrypt.compare(password, user?.password || "");

        if (!user || !correct) {
            res.status(400).json({ error: "Invalid credentials" })
        };

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function signOut(req, res) {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}