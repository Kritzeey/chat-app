
export async function signUp(req, res) {
    try {
        const { name, username, password, confirmPassword } = req.body;
    } catch (error) {

    }
}

export async function signIn(req, res) {
    res.send("signin");
}

export async function signOut(req, res) {
    res.send("signout");
}