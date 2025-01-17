import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/features/cart/cartSlice'

const OrderSummary = () => {

    //Without calling dispatch, the clearCart action remains unused, so the Redux state doesn't update.
    //The useDispatch hook provides a way to dispatch actions from components.
    const dispatch = useDispatch();

    const products = useSelector((store) => store.cart.products);
    const {selectedItems, totalPrice, tax, taxRate, grandTotal} = useSelector((store) => store.cart);
   
    const handleClearCart  = () => {
        dispatch(clearCart())
    }
    
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