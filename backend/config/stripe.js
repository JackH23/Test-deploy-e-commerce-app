// !!! first look for https://stripe.com/in 
// !!! Developer > copy Secret key/backend and Publishable key/frontend
// !!! place them at .env STRIPE_SECRET_KEY

// !!! look for https://docs.stripe.com/ 
// !!! click Payments > Checkout > Quickstart (Stripe-hosted page)
// !!! select React and Node then copy npm install --save stripe for backend
// !!! look for Developer tools > SDKs > React Stripe.js > npm install @stripe/stripe-js /frontend

require('dotenv').config();
const Stripe = require("stripe")

const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
// Print the Stripe secret key to confirm it's loaded correctly (for debugging)
// console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);

module.exports = stripe

