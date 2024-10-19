// Import the `productModel` to interact with the product database
const productModel = require("../../models/productModel")

// Define an asynchronous function `getProductDetails` to handle the request for product details
const getProductDetails = async (req, res) => {
    try {

        //  console.log("ProductId", req)

        // Destructure `productId` from the request body
        const { productId } = req.body;

        // console.log("productId", productId)

        // Use `findById` method on the `productModel` to find a product by its ID
        const product = await productModel.findById(productId);

        // Send a JSON response back to the client with the product details
        res.json({
            data: product,               // The product data retrieved from the database
            message: "Ok",               // A success message
            success: true,               // Indicates the operation was successful
            error: false                 // Indicates no error occurred
        });

    } catch (err) {
        // If an error occurs during the execution of the `try` block, handle it here
        res.json({
            message: err?.message || err, // Send the error message if available
            error: true,                  // Indicates an error occurred
            success: false                // Indicates the operation was not successful
        });
    }
}

// Export the `getProductDetails` function so it can be used in other parts of the application
module.exports = getProductDetails;
