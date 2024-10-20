import React from 'react'
import App from '../App'
import Home from "../pages/Home"
import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import ForgotPassowrd from "../pages/ForgotPassowrd"
import CategoryProduct from '../pages/CategoryProduct'
import { ProductDetails } from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import AdminPanel from '../pages/AdminPanel'
import AllProducts from '../pages/AllProducts'
import AllUsers from '../pages/AllUsers'
import Success from '../pages/Success'
import Cancel from '../pages/Cancel'
import Order from '../pages/Order'
import AllOrder from '../pages/AllOrder'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "forgot-passowrd",
        element: <ForgotPassowrd />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path: "product-category",
        element: <CategoryProduct />
      },
      {
        path: "product/:id",
        element: <ProductDetails />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "search",
        element: <SearchProduct />
      },
      {
        path: "success",
        element: <Success/>
      },
      {
        path: "order",
        element: <Order/>
      },
      {
        path: "cancel",
        element: <Cancel/>
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "all-order",
            element: <AllOrder />,
          }
        ]
      }
    ]
  }
])

export default router