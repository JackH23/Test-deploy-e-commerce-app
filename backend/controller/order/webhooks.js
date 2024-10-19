const stripe = require("../../config/stripe");
const addToCartModel = require("../../models/cartProduct");
const orderModel = require("../../models/orderProductModel");

// console.log("process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY",process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY)
const endpointSecret = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

async function getLineItems(lineItems) {
    let ProductItems = []

    if (lineItems?.data?.length) {
        for (const item of lineItems.data) {
            const product = await stripe.products.retrieve(item.price.product)
            // console.log("product",product)
            const productId = product.metadata.productId

            const productData = {
                productId: productId,
                name: product.name,
                price: item.price.unit_amount/100,
                quantity: item.quantity,
                image: product.images
            }

            ProductItems.push(productData)
        }
    }

    return ProductItems
}

const webhooks = async (Request, response) => {
    const signature = Request.headers['stripe-signature'];
    const payloadString = JSON.stringify(Request.body);

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret: endpointSecret,
    });

    let event;

    try {
        event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    } catch (error) {
        response.status(400).send(`Webhook Error: ${error.message}`);
        return;
    }

    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object;
            // console.log("session",session)
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            console.log("lineItems", lineItems);
            // console.log("amount_totals:",sess ion.amount_total/100)
            const productDetails = await getLineItems(lineItems)
            // console.log("productDetails",productDetails)

            const orderDetails = {
                productDetails: productDetails,
                email: session.customer_email,
                // this metadata com from paymentController.js
                userId: session.metadata.userId,
                paymentDetails: {
                    paymentId: session.payment_intent,
                    payment_method_type: session.payment_intent,
                    payment_status: session.payment_status,
                },
                shipping_options: session.shipping_options.map(s => {
                    return{
                        ...s,
                        shipping_amount: s.shipping_amount/100
                    }
                }),
                totalAmount: session.amount_total/100
            }

            const order = new orderModel(orderDetails)
            const saveOder = await order.save()

            if(saveOder?._id){
                const deleteCartItem = await addToCartModel.deleteMany({userId: session.metadata.userId})
            }
            break;

        case "charge.updated":
            // Handle charge.updated event
            const updatedCharge = event.data.object;
            console.log("Charge Updated:", updatedCharge);

            // Implement any further logic here if needed (e.g., updating order status in your database)
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    response.status(200).send();
};

module.exports = webhooks;
