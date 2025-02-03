import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice'
import { loadStripe } from "@stripe/stripe-js";
import { getBaseURL } from '../../utils/baseUtil';


const OrderSummary = () => {

    //Without calling dispatch, the clearCart action remains unused, so the Redux state doesn't update.
    //The useDispatch hook provides a way to dispatch actions from components.
    const dispatch = useDispatch();
    //TODO: Get the user related to payments
    const { user } = useSelector(store => store.auth);
    // console.log(user);
    const products = useSelector((store) => store.cart.products);
    console.log(products)
    const {selectedItems, totalPrice, tax, taxRate, grandTotal} = useSelector((store) => store.cart);
   
    const handleClearCart  = () => {
        dispatch(clearCart())
    }
    
    //TODO: Implement the makePayment function
    // payment integration
    const makePayment = async (e) => {
        e.stopPropagation();
        try {
          const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
      
          const body = {
            products: products,
            userId: user?._id
          };
      
          const response = await fetch('http://localhost:5000/api/orders//create-checkout-session', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          });
      
          const data = await response.json();
      
          if (response.ok) {
            const result = await stripe.redirectToCheckout({
              sessionId: data.id
            });
      
            if (result.error) {
              console.error("Stripe error:", result.error);
            }
          } else {
            console.error("Server error:", data.error);
            // Display an error message to the user if needed
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      


    return (
    <div className='bg-primary-light mt-5 rounded text-base'>
        <div className='px-6 py-4 space-y-5'>
            <h2 className='text-xl font-bold text-dark'>Order Summary</h2>
            <p className='text-text-dark mt-2'>Selected Items: {selectedItems}</p>
            <p>Total Price: ${totalPrice.toFixed()}</p>
            <p>Tax: ({taxRate * 100}%): ${tax.toFixed(2)}</p>
            <h3 className='font-bold'>Grand Total: ${grandTotal.toFixed(2)}</h3>
            <div className='px-4 mb-6'>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleClearCart();
                    }}
                    className='bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4'>
                    <span className='mr-2'> Clear Cart</span>
                    <i className="ri-delete-bin-6-fill"></i>
                </button>
                <button 
                    // todo
                    onClick={(e) => {
                        e.stopPropagation();
                        makePayment(e);
                    }}
                    className="bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4">
                   <span className='mr-2'> Proceed checkout </span>
                   <i className ="ri-bank-card-fill"></i>
                </button>

            </div>
        </div>
    </div>
  )
}

export default OrderSummary