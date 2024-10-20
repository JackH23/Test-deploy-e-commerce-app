const fetchCategoryWiseProduct = async (category) => {
    try {
        const response = await fetch(SummaryApi.categoryWiseProduct.url, {
            method: SummaryApi.categoryWiseProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ category })
        });

        // Check if response status is OK (status 200-299)
        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            throw new Error(`Failed to fetch. Status: ${response.status}`);
        }

        const textResponse = await response.text(); // Get response as text first
        console.log("Raw Response:", textResponse); // Debugging raw response

        // Check if response is not empty before parsing
        if (!textResponse) {
            throw new Error("Empty response from server.");
        }

        const dataResponse = JSON.parse(textResponse); // Parse valid JSON
        return dataResponse;
    } catch (error) {
        console.error("Fetch error:", error.message);
        return { error: error.message }; // Return error object to handle gracefully
    }
};

export default fetchCategoryWiseProduct;
