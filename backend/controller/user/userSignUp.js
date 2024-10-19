const userModel = require("../../models/userModel")
const bcrypt = require("bcryptjs")

async function userSignUpController(req, res) {
    try {

        console.log("req.body", req.body)

        const { email, password, name } = req.body;

        const user = await userModel.findOne({ email });
        console.log("user", user)

        if (user) {
            throw new Error("Already user exist.");
        }
        if (!email) {
            throw new Error("Pease provide email");
        }
        if (!password) {
            throw new Error("Pease provide password");
        }
        if (!name) {
            throw new Error("Pease provide name");
        }

        const salt = bcrypt.genSaltSync(10)

        const hashPassword = await bcrypt.hashSync(password, salt)

        if (!hashPassword) {
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }

        const userData = new userModel(payload);

        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created Successfully!"
        })

    } catch (error) {
        // console.log("error",error)
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = userSignUpController