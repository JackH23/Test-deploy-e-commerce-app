// Import the mongoose library, which is used to interact with MongoDB
const mongoose = require('mongoose')

// Define a new schema for products using mongoose's Schema class
const productSchema = mongoose.Schema({
    // Define the fields for the product schema along with their data types
    productName: String,           // Field to store the name of the product (String type)
    brandName: String,             // Field to store the brand name of the product (String type)
    category: String,              // Field to store the category of the product (String type)
    productImage: [],              // Field to store an array of product image URLs (Array type)
    description: String,           // Field to store a description of the product (String type)
    price: Number,                 // Field to store the price of the product (Number type)
    sellingPrice: Number           // Field to store the selling price of the product (Number type)
}, {
    timestamps: true                // Option to automatically add `createdAt` and `updatedAt` timestamps to each document
})

// Create a new model named "product" using the defined product schema
// The model represents the 'product' collection in the database, and provides an interface to interact with it
const productModel = mongoose.model("product", productSchema)

// Export the 'productModel' so it can be used in other parts of the application
module.exports = productModel
