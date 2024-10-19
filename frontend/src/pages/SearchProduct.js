import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCart from '../components/VerticalCart'

const SearchProduct = () => {
  const query = useLocation()
  console.log("query", query)

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const fetchProduct = async () => {
    setLoading(true)

    const response = await fetch(SummaryApi.searchProduct.url + query.search)
    const dataResponse = await response.json()

    setLoading(false)

    // console.log("fetchProduct", dataResponse)
    setData(dataResponse.data)
  }

  useEffect(() => {
    fetchProduct()
  }, [query])

  // console.log("fetchProduct",data)

  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading ...</p>
        )
      }

      { /* Display the count of search results */}
      <p className='text-lg font-semibold my-3'>Search Results : {data.length}</p>

      { /* Show a "No Data Found" message if no results are returned and data has finished loading */}
      {
        data.length === 0 && (
          <p className='bg-white text-lg text-center p-4'>No Data Found...</p>
        )
      }

      { /* If data is available and not loading, display the products using the `VerticalCard` component */}
      {
        data.length !== !loading && (
          <VerticalCart loading={loading} data={data} />
        )
      }

    </div>
  )
}

export default SearchProduct