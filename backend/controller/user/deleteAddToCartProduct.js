const addToCartModel = require("../../models/cartProduct")

const deleteAddToCartProduct = async (req, res) => {
    try {
        const addToCartProductId = req.body._id;
        // !! console.log("addToCartProductId",addToCartProductId)

        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId })

        res.json({
            message: "Product Delete From Cart",
            error: false,
            success: true,
            data: deleteProduct
        })

    } catch (error) {
        res.json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = deleteAddToCartProduct