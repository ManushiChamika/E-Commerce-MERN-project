import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import authAPi from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import productsApi from "./features/products/productsApi";
import reviewApi from "./features/reviews/reviewsApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authAPi.reducerPath] : authAPi.reducer, 
    auth : authReducer,
    [productsApi.reducerPath] : productsApi.reducer,
    [reviewApi.reducerPath] : reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPi.middleware, productsApi.middleware, reviewApi.middleware),
});
