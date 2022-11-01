import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import { ACTIONS } from '../actions';
import { useProductsContext } from './products_context';

const initialState = {};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  return (
    <FilterContext.Provider value='filter context'>
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
