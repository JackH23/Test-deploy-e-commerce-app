import React, { useState } from 'react'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';

const AdminProductCard = ({ data, key, fetchData }) => {

        const [editProduct,setEditProduct] = useState(false)

    return (
        <div className='bg-white p-4 rounded'>

            {/* Container for product image and details */}
            <div className='w-40'>

                {/* Product Image */}
                <div className='w-32 h-32 flex justify-center items-center'>
                    {/* Display the first product image from the product data */}
                    <img src={data?.productImage[0]} className='mx-auto object-fill h-full' />
                </div>

                {/* Product Name */}
                <h1 className='text-ellipsis line-clamp-2'>
                    {data.productName} {/* Display the product name */}
                </h1>

                <div>
                    {/* Product Price */}
                    <p className='font-semibold'>
                        {
                            // Display the product selling price formatted in INR using the helper function
                            displayINRCurrency(data.sellingPrice)
                        }
                    </p>

                    {/* Edit button */}
                    {/* This div acts as an edit button that opens the edit modal when clicked */}
                    <div
                        className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
                        onClick={() => setEditProduct(true)}  // Set the editProduct state to true to open the edit modal
                    >
                        {/* Display the edit icon */}
                        <MdModeEditOutline />
                    </div>

                </div>
            </div>

            {/* Conditionally render the AdminEditProduct component when editProduct is true */}
            {
                editProduct && (
                    <AdminEditProduct
                        productData={data}
                        onClose={() => setEditProduct(false)}
                        fetchData={fetchData}
                    />
                )
            }
        </div>
    )
}

export default AdminProductCard