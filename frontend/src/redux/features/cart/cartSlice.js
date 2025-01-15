import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products :[],
    selectedItems: 0,
    totalPrice: 0,
    tax:0,
    taxRate:0.05,
    grandTotal: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    // reducers
    reducers:{
        addToCart : (state, action) => {
            const isExist = state.products.find((product) => product.id === action.payload.id);
        
            if(!isExist){
                state.products.push({...action.payload, quantity: 1})
            }else{
                console.log("Items already added")
            };

            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
        }
    }
})

//utilities function
export const setSelectedItems = (state) => state.products.reduce((total, product) => {
    return Number( total + product.quantity, 0)
});

export const setTotalPrice = (state) => state.products.reduce((total, product) => {
    return Number( total + product.quantity * product.price, 0)
});

export const setTax = (state) => setTotalPrice(state) * state.taxRate;

export const setGrandTotal = (state) => {
    return setTotalPrice(state) + setTotalPrice(state) * state.taxRate;
};

// export all actions
export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;
