const productModel = require("../../models/productModel")

const filterProductController = async (req, res) => {
    try {
        const categoryList = req?.body?.category || []
        // console.log("categoryList", categoryList)

        const Product = await productModel.find({
            category: {
                "$in": categoryList
            }
        })
        
        res.json({
            data: Product,
            message: "Filtered product list",
            error: false,
            success: true
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports = filterProductController