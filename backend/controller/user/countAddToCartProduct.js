const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
    try {
        const userId = req.userId

        const count = await addToCartModel.countDocuments({
            userId: userId
        })

        res.json({
            data: {
                count: count
            },
            message: "Ok",
            error: false,
            success: true
        });

    } catch (error) {
        res.json({
            message: error.message || error,  // Return the error message.
            error: true,                      // Indicate that an error occurred.
            success: false                    // Indicate that the operation failed.
        });
    }
}

module.exports = countAddToCartProduct