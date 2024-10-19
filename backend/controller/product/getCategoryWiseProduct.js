const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
    try {

        // console.log("getCategoryWiseProduct", req);

        const { category } = req?.body || req?.query

        const product = await productModel.find({ category })

        // console.log("product", product)

        res.json({
            data: product,
            message: "Product",
            success: true,
            error: false
        });

    } catch (error) {
        res.status(400).json({
            message: err.message || err,  // Error message
            error: true,  // Indicates that an error occurred
            success: false // Indicates the operation was not successful
        });
    }
}

module.exports = getCategoryWiseProduct