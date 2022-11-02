import { ACTIONS } from '../actions';

const products_reducer = (state, action) => {
  const { type, payload } = action;
  if (type === ACTIONS.SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (type === ACTIONS.SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }

  if (type === ACTIONS.GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true };
  }
  if (type === ACTIONS.GET_PRODUCTS_SUCCESS) {
    const featured_products = payload.filter(
      (product) => product.featured === true
    );

    return {
      ...state,
      products_loading: false,
      products: payload,
      featured_products,
    };
  }

  if (type === ACTIONS.GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
