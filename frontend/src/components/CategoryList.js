import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom';

const CategoryList = () => {

  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  const categoryLoading = new Array(13).fill(null)

  const fetchCategoryProduct = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false)
    console.log("CategoryList", dataResponse)
    setCategoryProducts(dataResponse.data);
  }

  useEffect(() => {
    fetchCategoryProduct();
  },[])

  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
        {
          loading ? (
            categoryLoading.map((el, index) => {
              return (
                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading" + index}></div>
              )
            })
          ) : (
            categoryProducts.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product?.category}
                  className='cursor-pointer'
                  key={product?.category}  // Use the product category as the key for unique identification
                >
                  {/* Container for displaying category image */}
                  <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                    {/* Display the product image */}
                    <img
                      src={product?.productImage[0]}  // Display the first image in `productImage` array
                      alt={product?.category}         // Set the image's alt text as the category name
                      className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'
                    />
                  </div>
                  {/* Display the category name below the image */}
                  <p className='text-center text-sm md:text-base capitalize'>
                    {product?.category}  {/* Show the category name in the text element */}
                  </p>
                </Link>
              )
            })
          )
        }
      </div>
    </div>
  )
}

export default CategoryList