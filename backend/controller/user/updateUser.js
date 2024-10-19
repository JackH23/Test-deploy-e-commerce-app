const userModel = require("../../models/userModel")

async function updateUser(req, res) {
    try {
        // console.log("Update role user", req.userId)

        const sessionUser = req.userId

        const { userId, email, name, role } = req.body

        const payload = {
            ...(email && { email: email }),
            ...(name && { name: name }),
            ...(role && { role: role }),
        }

        const user = await userModel.findById(sessionUser)

        console.log("user.role", user.role)

        const updateUser =  await userModel.findByIdAndUpdate(userId, payload)

        res.json({
            data: updateUser,
            message: "User Update",
            success: true,
            error: false
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error, // Error message, fallback to `err` if `err.message` doesn't exist
            error: true, // Indicating that an error occurred
            success: false // Operation failed
        })
    }
}

module.exports = updateUser