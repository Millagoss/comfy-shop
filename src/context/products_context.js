import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url as url } from '../utils/constants';
import { ACTIONS } from '../actions';

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: ACTIONS.SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: ACTIONS.SIDEBAR_CLOSE });
  };

  const fetchProducts = async (url) => {
    dispatch({ type: ACTIONS.GET_PRODUCTS_BEGIN });
    try {
      const { data: products } = await axios(url);
      dispatch({ type: ACTIONS.GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: ACTIONS.GET_PRODUCTS_ERROR });
    }
  };

  const fetchSingleProduct = async (url) => {
    dispatch({ type: ACTIONS.GET_SINGLE_PRODUCT_BEGIN });
    try {
      const { data: singleProduct } = await axios(url);
      dispatch({
        type: ACTIONS.GET_SINGLE_PRODUCT_SUCCESS,
        payload: singleProduct,
      });
    } catch (error) {
      dispatch({ type: ACTIONS.GET_SINGLE_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  const value = {
    openSidebar,
    closeSidebar,
    ...state,
    fetchSingleProduct,
  };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
