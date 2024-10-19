const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(200).json({
                message: "Please Login...!",
                error: true,
                success: false,
            });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRETE_KEY, function (err, decoded) {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({
                        message: "Session expired, please login again.",
                        error: true,
                        success: false,
                    });
                }
                console.log("error auth", err);
                return res.status(401).json({
                    message: "Invalid token, please login again.",
                    error: true,
                    success: false,
                });
            }

            // If token is valid, add user ID to request object
            req.userId = decoded?._id;
            next();
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data: [],
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;
