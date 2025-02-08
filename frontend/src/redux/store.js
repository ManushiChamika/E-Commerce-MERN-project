import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import authAPi from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import productsApi from "./features/products/productsApi";
import reviewApi from "./features/reviews/reviewsApi";
import statsApi from "./features/stats/statsApi";
import orderApi from "./features/orders/orderApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authAPi.reducerPath] : authAPi.reducer, 
    auth : authReducer,
    [productsApi.reducerPath] : productsApi.reducer,
    [reviewApi.reducerPath] : reviewApi.reducer,
    [statsApi.reducerPath] : statsApi.reducer,
    [orderApi.reducerPath] : orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPi.middleware, productsApi.middleware, reviewApi.middleware, statsApi.middleware, orderApi.middleware),
});
