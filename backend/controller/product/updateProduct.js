const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function updateProductController(req, res) {
    try {
        // console.log("updateProductController", req.userId)

        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied")
        }

        const { _id, ...resBody } = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, { new: true });

        res.json({
            message: "Product updated successfully",
            data: updateProduct,
            success: true,
            error: false
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = updateProductController