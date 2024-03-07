import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {//מוסיף מוצר 1 לסל
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {//מסיר מוצר לפי הID שלו מהסל
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = removeItem;
    },
    incrementQuantity: (state, action) => {//מגדיל את כמות המוצר בסל
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      itemPresent.quantity++;
    },
    decrementQuantity: (state, action) => {//מוריד את כמות המוצר בסל אם 1 נסיר אותו
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent.quantity === 1) {
        const removeItem = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removeItem;
      } else {
        itemPresent.quantity--;
      }
    },
    cleanCart: (state) => {//ניקוי כל המוצרים בסל
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
} = CartSlice.actions;

export default Cart.action
//export default Cart

