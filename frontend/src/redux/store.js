import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";
import authAPi from "./features/auth/authApi";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authAPi.reducerPath] : authAPi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPi.middleware),

  

});
