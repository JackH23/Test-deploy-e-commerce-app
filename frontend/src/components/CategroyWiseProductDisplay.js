// Import necessary dependencies and components from React and other helper files
import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct' // Import the function to fetch products by category
import displayINRCurrency from '../helpers/displayCurrency' // Helper function to display INR currency format
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6' // Icons used for navigation, though not utilized here
import { Link } from 'react-router-dom' // React Router DOM component for navigation
import addToCart from '../helpers/addToCart' // Helper function to handle adding products to the cart
import Context from '../context' // Context to manage global states and functions
import scrollTop from '../helpers/scrollTop' // Helper function to scroll to the top of the page on navigation

// Define the `CategroyWiseProductDisplay` component that takes in `category` and `heading` as props
const CategroyWiseProductDisplay = ({ category, heading }) => {
    // State to manage product data fetched based on category
    const [data, setData] = useState([])
    // State to manage the loading state of the component
    const [loading, setLoading] = useState(true)
    // Create an array to represent loading placeholders
    const loadingList = new Array(13).fill(null)

    // Destructure `fetchUserAddToCart` function from the global context to update cart details
    // fetchUserAddToCart com from App.js
    const { fetchUserAddToCart } = useContext(Context)

    // Function to handle adding a product to the cart
    const handleAddToCart = async (e, id) => {
        await addToCart(e, id) // Call the `addToCart` function to add product
        fetchUserAddToCart() // Update the cart data in the context
    }

    // Function to fetch data for products based on the provided category
    const fetchData = async () => {
        setLoading(true) // Set loading state to true
        const categoryProduct = await fetchCategoryWiseProduct(category) // Fetch products by category
        setLoading(false) // Set loading state to false once data is fetched

        console.log("horizontal data", categoryProduct.data) // Log the fetched data
        setData(categoryProduct?.data) // Update the state with fetched product data
    }

    // `useEffect` hook to fetch product data when the component mounts or the `category` changes
    useEffect(() => {
        fetchData()
    }, [category])

    // JSX to render the component UI
    return (
        <div className='container mx-auto px-4 my-6 relative'>
            {/* Heading of the category display */}
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

            {/* Container to display the list of products */}
            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
                {
                    // Display a loading skeleton when data is being fetched
                    loading ? (
                        // Map over `loadingList` array to render loading skeletons
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ' key={index}>
                                    {/* Placeholder for product image */}
                                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                    </div>
                                    {/* Placeholder for product details */}
                                    <div className='p-4 grid gap-3'>
                                        {/* Placeholder for product name */}
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                        {/* Placeholder for product category */}
                                        <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                                        {/* Placeholder for product price */}
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                            <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                        </div>
                                        {/* Placeholder for Add to Cart button */}
                                        <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        // Map over the fetched product data and render the actual product details
                        data.map((product, index) => {
                            return (
                                // Link component to navigate to product details page
                                <Link to={"/product/" + product?._id} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow ' onClick={scrollTop} key={product?._id}>
                                    {/* Product image container */}
                                    <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                        {/* Display the first product image */}
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' alt={product?.productName}/>
                                    </div>
                                    {/* Product details */}
                                    <div className='p-4 grid gap-3'>
                                        {/* Product name */}
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        {/* Product category */}
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        {/* Product price and discounted price */}
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                        </div>
                                        {/* Add to Cart button */}
                                        <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

// Export the component to be used in other parts of the application
export default CategroyWiseProductDisplay
