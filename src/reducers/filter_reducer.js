import { ACTIONS } from '../actions';

const filter_reducer = (state, action) => {
  const { type, payload } = action;
  if (type === ACTIONS.LOAD_PRODUCTS) {
    return {
      ...state,
      all_products: [...payload],
      filtered_products: [...payload],
    };
  }

  if (type === ACTIONS.SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (type === ACTIONS.SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (type === ACTIONS.UPDATE_SORT) {
    return { ...state, sort: payload };
  }

  if (type === ACTIONS.SORT_PRODUCTS) {
    return { ...state, filtered_products: payload };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
