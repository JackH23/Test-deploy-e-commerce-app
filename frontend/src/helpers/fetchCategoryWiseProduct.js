// Import `SummaryApi` object which contains API details (url, method, etc.) from the "common" module
const { default: SummaryApi } = require("../common")

// Asynchronous function to fetch products based on category
const fetchCategoryWiseProduct = async (category) => {
    // !! console.log("categoryData", category)
    // Send a fetch request to the `categoryWiseProduct` API endpoint defined in the `SummaryApi` object
    const response = await fetch(SummaryApi.categoryWiseProduct.url, {
        method: SummaryApi.categoryWiseProduct.method, // Use the HTTP method defined in `SummaryApi` (e.g., "POST" or "GET")
        headers: {
            "content-type": "application/json" // Set the request header to indicate JSON content
        },
        body: JSON.stringify({
            category: category // Include the category in the request body (converted to JSON format)
        })
    })

    // Parse the JSON response from the server
    const dataResponse = await response.json()

    // Return the parsed data
    return dataResponse
}

// Export the `fetchCategoryWiseProduct` function as the default export of this module
export default fetchCategoryWiseProduct
