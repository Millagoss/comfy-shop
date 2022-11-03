import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import { ACTIONS } from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTIONS.LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    sortItems(state.sort);
  }, [state.sort, state.filtered_products]);

  const sortItems = (param) => {
    let tempProducts = [];

    if (param === 'price-lowest') {
      tempProducts = state.all_products.sort((a, b) => a.price - b.price);
    }
    if (param === 'price-highest') {
      tempProducts = state.all_products.sort((a, b) => b.price - a.price);
    }
    if (param === 'name-a') {
      tempProducts = state.all_products.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (param === 'name-z') {
      tempProducts = state.all_products.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }
    dispatch({ type: ACTIONS.SORT_PRODUCTS, payload: tempProducts });
  };

  const setGridView = () => {
    dispatch({ type: ACTIONS.SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: ACTIONS.SET_LISTVIEW });
  };

  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: ACTIONS.UPDATE_SORT, payload: value });
  };

  const value = { ...state, setGridView, setListView, updateSort };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
