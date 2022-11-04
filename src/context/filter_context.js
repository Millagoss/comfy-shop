import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import { ACTIONS } from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: ACTIONS.LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: ACTIONS.FILTER_PRODUCTS });
    dispatch({ type: ACTIONS.SORT_PRODUCTS });
  }, [state.sort, state.all_products, state.filters]);

  const updateFilters = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: ACTIONS.UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = (e) => {};

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

  const value = {
    ...state,
    setGridView,
    setListView,
    updateSort,
    updateFilters,
    clearFilters,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
