// console.log("process.env.REACT_APP_BACKEND_URL ", process.env.REACT_APP_BACKEND_URL )
const backendDomain = process.env.REACT_APP_BACKEND_URL//"http://localhost:8080"


const SummaryApi = {
    SignUp: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    singIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUsers: {
        url: `${backendDomain}/api/all-user`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: "get"
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,  // Full URL for fetching details of a single product
        method: 'post'  // HTTP method (POST) used for this request
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,  // Full URL for fetching details of a single product
        method: 'post'  // HTTP method (POST) used for this request
    },
    addToCartProductCount: {
        url: `${backendDomain}/api/countAddToCartProduct`,  // Full URL for fetching details of a single product
        method: 'get'  // HTTP method (POST) used for this request
    },
    addToCartProductView: {
        url: `${backendDomain}/api/view-card-product`,  // Full URL for fetching details of a single product
        method: 'get'  // HTTP method (POST) used for this request
    },
    updateCartProduct: {
        url: `${backendDomain}/api/update-cart-product`,  // Full URL for updating a product in the cart
        method: 'post'  // HTTP method (POST) used for this request
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-product`,  // Full URL for updating a product in the cart
        method: 'post'  // HTTP method (POST) used for this request
    }, searchProduct: {
        url: `${backendDomain}/api/search`,  // Full URL for updating a product in the cart
        method: 'get'  // HTTP method (POST) used for this request
    }, filterProduct: {
        url: `${backendDomain}/api/filter-product`,  // Full URL for updating a product in the cart
        method: 'post'  // HTTP method (POST) used for this request
    },
    payment: {
        url: `${backendDomain}/api/checkout`,  // Full URL for updating a product in the cart
        method: 'post'  // HTTP method (POST) used for this request
    },
    getOrder: {
        url: `${backendDomain}/api/order-list`,  // Full URL for updating a product in the cart
        method: 'get'  // HTTP method (POST) used for this request
    },
    allOrder: {
        url: `${backendDomain}/api/all-order`,  // Full URL for updating a product in the cart
        method: 'get'  // HTTP method (POST) used for this request
    },
}

export default SummaryApi