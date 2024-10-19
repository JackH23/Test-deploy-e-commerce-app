import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import uploadImage from '../helpers/uploadlmage';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import DisplayImage from './DisplayImage';

const AdminEditProduct = ({ productData, onClose, fetchData }) => {

    const [fullScreenImage, setFullScreenImage] = useState("");
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(file);

        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // !! console.log("upDate Product", data)

        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()

        // console.log("ProductEdit", responseData)  

        if (responseData.success) {
            toast.success(responseData?.message);
            onClose();
            fetchData();
        }

        if (responseData.error) {
            toast.error(responseData?.message)
        }
    }

    const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage];
        newProductImage.splice(index, 1)

        setData((prev) => {
            return {
                ...prev,
                productImage: [...newProductImage]
            }
        })
    }

    return (
        <div className='fixed w-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

                {/* Header section with title and close button */}
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='front-bold text-lg'>Edit Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                {/* Form for editing the product details */}
                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>

                    {/* Product Name input */}
                    <label htmlFor='productName'>Product Name :</label>
                    <input
                        type='text'
                        id='productName'
                        name='productName'
                        placeholder='Enter product name'
                        className='p-2 bg-slate-100 border rounded'
                        value={data.productName}
                        onChange={handleOnChange}
                        required
                    />

                    {/* Brand Name input */}
                    <label htmlFor='brandName'>Brand Name :</label>
                    <input
                        type='text'
                        id='brandName'
                        name='brandName'
                        placeholder='Enter brand name'
                        className='p-2 bg-slate-100 border rounded'
                        value={data.brandName}
                        onChange={handleOnChange}
                        required
                    />

                    {/* Category dropdown */}
                    <label htmlFor='category' className='mt-3'>Category :</label>
                    <select name="category" value={data.category} required onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                        <option value={""}>Select Category</option>
                        {productCategory.map((el, index) => (
                            <option value={el.value} key={el.value + index}>{el.label}</option>
                        ))}
                    </select>

                    {/* Product Image upload section */}
                    <label htmlFor='productImage' className='mt-3'>Product Image :</label>
                    <label htmlFor='uploadImageInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Product Image</p>
                                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>

                    {/* Display uploaded images */}
                    <div>
                        {data.productImage.length > 0 ? (
                            <div className='flex items-center gap-2'>
                                {data.productImage.map((el, index) => (
                                    <div className='relative group' key={index}>
                                        <img
                                            src={el}
                                            alt={`Product ${index}`}
                                            width={80}
                                            height={80}
                                            className='bg-slate-100 border cursor-pointer'
                                            onClick={() => {
                                                setFullScreenImage(el);
                                                setOpenFullScreenImage(true);
                                            }}
                                        />
                                        {/* Delete button for images */}
                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                            <MdDelete />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className='text-red-600 text-xs'>*Please upload product image</p>
                        )}
                    </div>

                    {/* Price input field */}
                    <label htmlFor='price' className='mt-3'>Price :</label>
                    <input
                        type='number'
                        id='price'
                        placeholder='Enter price'
                        name='price'
                        value={data.price}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    {/* Selling Price input field */}
                    <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
                    <input
                        type='number'
                        id='sellingPrice'
                        placeholder='Enter selling price'
                        name='sellingPrice'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    {/* Description text area */}
                    <label htmlFor='description' className='mt-3'>Description :</label>
                    <textarea
                        className='h-28 bg-slate-100 border resize-none p-1'
                        placeholder='Enter product description'
                        rows={3}
                        name='description'
                        value={data.description}
                        onChange={handleOnChange}
                    />

                    {/* Submit button */}
                    <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>
                        Upload Product
                    </button>
                </form>
            </div>

            {/* Full-screen image display modal */}
            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                )
            }
        </div>
    )
}

export default AdminEditProduct