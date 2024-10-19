const addToCartModel = require("../../models/cartProduct")

const updateAddToCartProduct = async (req, res) => {
    try {
        // const currentUserId = req.userId
        // console.log("addToCartProductId1", currentUserId)
        const addToCartProductId = req?.body?._id
        // console.log("addToCartProductId2", addToCartProductId)

        const qty = req.body.quantity

        const updateProduct = await addToCartModel.updateOne({ _id: addToCartProductId }, {
            ...(qty && { quantity: qty })
        })

        res.json({
            message: "Product Update",
            data: updateProduct,
            error: false,
            success: true
        })

    } catch (error) {
        res.json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = updateAddToCartProduct