const express = require('express')

const router = express.Router()

const userSignUpController = require('../controller/user/userSignUp')
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUser')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetail')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const paymentController = require('../controller/order/paymentController')
const webhooks = require('../controller/order/webhooks')
const orderController = require('../controller/order/orderController')
const allOrderController = require('../controller/order/allOrder.controller')
// const userSignInController = require('../controller/user/userSignIn')

router.post("/signup", userSignUpController) // http://localhost:8080/api/signup
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)

// //admin panel 
router.get("/all-user", authToken, allUsers)
router.post("/update-user", authToken, updateUser)

// //product
router.post("/upload-product", authToken, UploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-categoryProduct", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)
router.post("/filter-product", filterProductController)

// //user add to cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/view-card-product", authToken, addToCartViewProduct)
router.post("/update-cart-product", authToken, updateAddToCartProduct)
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)

// payment and order
router.post("/checkout", authToken, paymentController)

// cmd to path
// try to check webhooks by \myProJectCollect\Downloads\stripe_1.21.8_windows_x86_64
// past stripe login > y to allow access webhooks and login user
// then past stripe listen --forward-to localhost:8080/api/webhook
router.post("/webhook", webhooks)
router.get("/order-list", authToken, orderController)
router.get("/all-order",authToken,allOrderController)

module.exports = router