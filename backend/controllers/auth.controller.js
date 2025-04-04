import User from "../models/user.model.js";

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

        const profilePic = "https://avatar.iran.liara.run/public";

        const newUser = new User({
            name,
            username,
            password,
            profilePicture: profilePic,
        });

        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}

export async function signIn(req, res) {
    res.send("signin");
}

export async function signOut(req, res) {
    res.send("signout");
}