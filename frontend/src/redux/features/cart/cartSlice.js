import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products :[],
    selectedItems: 0,
    totalPrice: 0,
    tax:0 ,
    taxRate:0.05,
    grandTotal: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart : (state, action) => {
            const isExist = state.products.find((product) => product.id === action.payload._id);
        
            if(!isExist){
                state.products.push({...action.payload, quantity: 1})
            }
        }
    }
})