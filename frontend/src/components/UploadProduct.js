import React, { useState } from 'react';
import { CgClose } from "react-icons/cg"; // Close icon
import { FaCloudUploadAlt } from "react-icons/fa"; // Upload icon
import { MdDelete } from "react-icons/md"; // Delete icon
import productCategory from '../helpers/productCategory';
import uploadImage from '../helpers/uploadlmage';
import DisplayImage from './DisplayImage'; // Ensure DisplayImage component is correctly imported
import SummaryApi from '../common';
import { toast } from 'react-toastify'

const UploadProduct = ({ onClose, fetchAllProduct }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  // Handle input field changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle product image upload
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedImage = await uploadImage(file); // Ensure uploadImage is working correctly
        if (uploadedImage.url) {
          setData((prev) => ({
            ...prev,
            productImage: [...prev.productImage, uploadedImage.url]
          }));
        }
      } catch (error) {
        console.error("Failed to upload image", error);
      }
    }
  };

  // Handle delete product image
  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Uploading product data", data);

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()

    // !! console.log("UploadProduct", responseData)

    if (responseData.success) {
      toast.success(responseData?.message)
      onClose()
      fetchAllProduct()
    }

    if (responseData.error) {
      toast.error(responseData?.message)
    }

    // You can add logic to send the `data` object to your backend or API
  };

  return (
    <div className='fixed w-full h-full bg-slate-500 bg-opacity-35 top-0 left-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        {/* Modal header with title and close button */}
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Upload Product</h2>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
            <CgClose />
          </div>
        </div>

        {/* Product upload form */}
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

      {/* Full-screen image view when an image is clicked */}
      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imagUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default UploadProduct;
