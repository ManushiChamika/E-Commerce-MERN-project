const express = require('express');
const Order = require('./orders.model');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//create checkout session
router.post("/create-checkout-session", async (req, res) => {
    const {products} = req.body;

    try {
        //line items
       const lineItems = products.map((product) => ({
              price_data: {
                currency: "usd",
                product_data: {
                     name: product.name,
                     images: [product.image],
                },
                unit_amount: Math.round(product.price * 100)
              },
              quantity: product.quantity
       })) 
       //-----------------------

       const session =  await stripe.checkout.sessions.create({
           payment_method_types: ["card"],
           //used to count the total amount of the products
           line_items: lineItems,
           mode: "payment",
           success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
           cancel_url: `http://localhost:5173/cancel`
       });

         res.status(200).send({id: session.id})
        
    } catch (error) {
        console.log("Error creating checkout session", error);
        res.status(500).send({message: "Failed to create checkout session"});

    }
})

//confirm payment
router.post("/confirm-payment", async (req, res) => {
    const { session_id } = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items", "payment_intent"],
        });

        const paymentIntentId = session.payment_intent.id;
        let order = await Order.findOne({ orderId: paymentIntentId });

        if (!order) {
            const lineItems = session.line_items.data.map((item) => ({
                productId: item.description,
                quantity: item.quantity,
            }));

            const amount = session.amount_total / 100;

            order = new Order({
                orderId: paymentIntentId,
                amount,
                products: lineItems,
                email: session.customer_details.email,
                status: session.payment_intent.status === "succeeded" ? "pending" : "failed",
            });
        } else {
            order.status = session.payment_intent.status === "succeeded" ? "pending" : "failed";
        }

        await order.save();

        // Send only one response
        return res.status(200).json({ order, payment_status: session.payment_status });

    } catch (error) {
        console.log("Error confirming payment", error);
        return res.status(500).json({ message: "Failed to confirm payment" });
    }
});



module.exports = router;