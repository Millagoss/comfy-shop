import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url as url } from '../utils/constants';
import { ACTIONS } from '../actions';

const initialState = {};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  return (
    <ProductsContext.Provider value='products context'>
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
