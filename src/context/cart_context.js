import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import { ACTIONS } from '../actions';

const initialState = {};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  return (
    <CartContext.Provider value='cart context'>{children}</CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
