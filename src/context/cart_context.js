import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import { ACTIONS } from '../actions';

const getPreviousCartItems = () => {
  let cartItems = localStorage.getItem('cart-items');
  if (cartItems) {
    return JSON.parse(cartItems);
  }
  return [];
};

const initialState = {
  cart: getPreviousCartItems(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 523,
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart-items', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    dispatch({ type: ACTIONS.COUNT_CART_TOTALS });
  }, [state.cart]);

  const addToCart = (id, color, amount, product) => {
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: { id, color, amount, product },
    });
  };

  const removeItem = (id) => {
    dispatch({ type: ACTIONS.REMOVE_CART_ITEM, payload: id });
  };
  const toggleAmount = (id, text) => {
    dispatch({ type: ACTIONS.TOGGLE_CART_ITEM_AMOUNT, payload: { id, text } });
  };
  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART });
  };

  const value = { ...state, addToCart, removeItem, toggleAmount, clearCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
