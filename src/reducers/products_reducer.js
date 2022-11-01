import { ACTIONS } from '../actions';

const products_reducer = (state, action) => {
  const { type, payload } = action;
  if (type === ACTIONS.SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (type === ACTIONS.SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
