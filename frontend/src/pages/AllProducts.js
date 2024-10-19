import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("ProductData", dataResponse)

    setAllProduct(dataResponse?.data || []);

  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h1 className='font-bold text-lg'>All Product</h1>
        <button
          className='border-2 border-red-600 text-red hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full'
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload product
        </button>
      </div>

      {/* Section to display all the products */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCard
                data={product}
                key={index + "allProduct"}
                fetchData={fetchAllProduct}
              />
            )
          })
        }
      </div>

      {/* Modal for uploading a new product */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchAllProduct={fetchAllProduct}
        />
      )}
    </div>
  )
}

export default AllProducts