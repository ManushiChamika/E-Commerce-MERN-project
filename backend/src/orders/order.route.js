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

//get order by email
router.get("/:email", async (req, res) => {
    const { email } = req.params;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    try {
        const orders = await Order.find({ email:email });

        if(orders.length === 0 || !orders){
            return res.status(400).send({order: 0, message: "No orders found"});
        }        
        // Send only one response to frontend
        return res.status(200).json({orders});
        
    } catch (error) {
        console.log("Error fetching order by email", error);
        return res.status(500).json({ message: "Failed to fetch order by email" });
    }
});

// get order by id
router.get("/order/:id", async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).send({ message: "Order not found" });
      }
      res.status(200).send(order);
    } catch (error) {
      console.error("Error fetching orders by user id", error);
      res.status(500).send({ message: "Failed to fetch orders by user id" });
    }
  });
  
  // get all orders
  router.get("/", async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 });
      if (orders.length === 0) {
        return res.status(404).send({ message: "No orders found", orders: [] });
      }
  
      res.status(200).send(orders);
    } catch (error) {
      console.error("Error fetching all orders", error);
      res.status(500).send({ message: "Failed to fetch all orders" });
    }
  });
  
  // update order status
  router.patch("/update-order-status/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).send({ message: "Status is required" });
    }
  
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
          status,
          updatedAt: new Date(),
        },
        {
          new: true,
          runValidators: true,
        }
      );
  
      if(!updatedOrder) {
        return res.status(404).send({ message: "Order not found" });
      }
  
      res.status(200).json({
        message: "Order status updated successfully",
        order: updatedOrder
      })
  
    } catch (error) {
      console.error("Error updating order status", error);
      res.status(500).send({ message: "Failed to update order status" });
    }
  });
  
  // delete order
  router.delete('/delete-order/:id', async( req, res) => {
    const { id } = req.params;
  
    try {
      const deletedOrder = await Order.findByIdAndDelete(id);
      if (!deletedOrder) {
        return res.status(404).send({ message: "Order not found" });
      }
      res.status(200).json({
        message: "Order deleted successfully",
        order: deletedOrder
      })
      
    } catch (error) {
      console.error("Error deleting order", error);
      res.status(500).send({ message: "Failed to delete order" });
    }
  } )

module.exports = router;