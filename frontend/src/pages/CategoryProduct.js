import React, { useEffect, useState } from 'react'
import { json, useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from "../helpers/productCategory"
import SummaryApi from '../common'
import CategroyWiseProductDisplay from '../components/CategroyWiseProductDisplay'
import VerticalCart from '../components/VerticalCart'

const CategoryProduct = () => {
  const params = useParams();
  console.log("categorys", params)

  const [sortBy, setSortBy] = useState("")

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const urlCategoryListObject = {}

  const [data, setData] = useState([])
  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])

  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category")
  // console.log("urlCategoryListinArray", urlCategoryListinArray)
  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true
  })
  // console.log("urlCategoryListObject", urlCategoryListObject)


  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked
      }
    })
  }

  console.log("selectCategory", selectCategory)

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    });

    const dataResponse = await response.json();
    console.log("filterProduct", dataResponse)

    setData(dataResponse?.data || [])

  }

  useEffect(() => {
    fetchData();
  },[filterCategoryList])

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryName => {
      // console.log("categoryName", categoryName)
      if (selectCategory[categoryName]) {
        return categoryName;
      }
      return null
    }).filter(el => el);
    // console.log("arrayOfCategory", arrayOfCategory)

    setFilterCategoryList(arrayOfCategory)

    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    console.log("urlFormat", urlFormat)
    navigate("/product-category?" + urlFormat.join(""));

  },[selectCategory])

  const handleOnChangeSortBy = (e) => {
    const {value} = e.target;
    console.log("value",value)

    setSortBy(value)

    if(value === 'asc'){
      setData(prev => prev.sort((a,b) => a.sellingPrice - b.sellingPrice));
    }

    if(value === "dsc") {
      setData(prev => prev.sort((a,b) => b.sellingPrice - a.sellingPrice))
    }
  }

  // console.log("sortBy",sortBy)

  return (
    <div className='container max-auto p-4'>
      {/*** Desktop version layout */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/*** Left side (Filter and Sort options) */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/** Sort by options */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort by</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                {/* Radio button for sorting by Price - Low to High */}
                <input type='radio' name='sortBy' checked={sortBy === "asc"} value={"asc"} onChange={handleOnChangeSortBy}/>
                <label>Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                {/* Radio button for sorting by Price - High to Low */}
                <input type='radio' name='sortBy' checked={sortBy === "dsc"} value={"dsc"} onChange={handleOnChangeSortBy}/>
                <label>Price - Hight to Low</label>
              </div>
            </form>
          </div>

          {/** Filter by category checkboxes */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                // Render checkboxes for each category from the `productCategory` array
                productCategory.map((categoryName, index) => {
                  return (
                    <div className='flex items-center gap-3' key={categoryName?.value}>
                      <input
                        type='checkbox'
                        // Sets the name attribute to "category" for easy identification in forms.
                        name={"category"}
                        checked={selectCategory[categoryName?.value]}
                        value={categoryName?.value}
                        id={categoryName?.value}
                        onChange={handleSelectCategory}
                      />
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
              }
            </form>
          </div>
        </div>

        {/*** Right side (Product display) */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Result : {data.length}</p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {
              data.length !== 0 && !loading && (
                <VerticalCart data={data} loading={loading} />
              )
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default CategoryProduct