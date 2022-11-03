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

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
