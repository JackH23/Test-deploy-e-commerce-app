import React, { useContext } from 'react' // Import React and useContext for state management with context API.
import scrollTop from '../helpers/scrollTop' // Import the `scrollTop` helper function to scroll the page to the top.
import displayINRCurrency from '../helpers/displayCurrency' // Import the helper function to format prices in INR currency.
import Context from '../context' // Import the custom context from the context file.
import addToCart from '../helpers/addToCart' // Import the helper function to handle adding items to the cart.
import { Link } from 'react-router-dom' // Import Link from react-router-dom to navigate to other routes.

// Define the `VerticalCard` functional component.
// It accepts `loading` and `data` as props, with `data` defaulting to an empty array if not provided.
const VerticalCard = ({ loading, data = [] }) => {
    // Create an array of 13 elements filled with `null`, used to show loading skeletons.
    const loadingList = new Array(13).fill(null)

    // Extract the `fetchUserAddToCart` function from the context using `useContext`.
    // This function updates the cart count after adding an item to the cart.
    const { fetchUserAddToCart } = useContext(Context)

    // Define a function to handle the addition of products to the cart.
    // `e` is the event object, and `id` is the ID of the product to add.
    const handleAddToCart = async (e, id) => {
        await addToCart(e, id) // Call the `addToCart` function to add the product to the cart.
        fetchUserAddToCart() // Call `fetchUserAddToCart` to refresh the cart count or state in the context.
    }

    return (
        // Create a responsive grid layout to display the products or loading skeletons.
        <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>
        {
            // If `loading` is true, render loading skeletons for each item in the `loadingList` array.
            loading ? (
                loadingList.map((product, index) => {
                    return (
                        <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                {/* Placeholder for product image skeleton */}
                            </div>
                            <div className='p-4 grid gap-3'>
                                {/* Placeholder for product name skeleton */}
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                {/* Placeholder for product category skeleton */}
                                <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                <div className='flex gap-3'>
                                    {/* Placeholder for selling price skeleton */}
                                    <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                    {/* Placeholder for original price skeleton */}
                                    <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                </div>
                                {/* Placeholder for Add to Cart button skeleton */}
                                <button className='text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                            </div>
                        </div>
                    )
                })
            ) : (
                // If `loading` is false, map through the `data` array to display product cards.
                data.map((product, index) => {
                    return (
                        // Use `Link` to navigate to the product's details page when clicked.
                        <Link to={"/product/" + product?._id} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow' onClick={scrollTop}>
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                {/* Display the product image. The `object-scale-down` and `hover:scale-110` classes create a zoom-in effect on hover. */}
                                <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                            </div>
                            <div className='p-4 grid gap-3'>
                                {/* Display the product name. */}
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                {/* Display the product category. */}
                                <p className='capitalize text-slate-500'>{product?.category}</p>
                                <div className='flex gap-3'>
                                    {/* Display the selling price formatted in INR. */}
                                    <p className='text-red-600 font-medium'>{ displayINRCurrency(product?.sellingPrice) }</p>
                                    {/* Display the original price formatted in INR, with a line-through style to indicate a discount. */}
                                    <p className='text-slate-500 line-through'>{ displayINRCurrency(product?.price) }</p>
                                </div>
                                {/* "Add to Cart" button to add the product to the cart. */}
                                {/* Calls `handleAddToCart` when clicked, passing the event and product ID. */}
                                <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                            </div>
                        </Link>
                    )
                })
            )
        }
        </div>
    )
}

export default VerticalCard // Export the component to be used in other parts of the application.
