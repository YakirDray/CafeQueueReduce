import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Redux/Cart";

export default configureStore({
  reducer: {
    cart: CartReducer,
  },
});
