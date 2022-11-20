import { ACTIONS } from '../actions';

const filter_reducer = (state, action) => {
  const { type, payload } = action;
  if (type === ACTIONS.LOAD_PRODUCTS) {
    let maxPrice = payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      all_products: [...payload],
      filtered_products: [...payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
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

  if (type === ACTIONS.UPDATE_FILTERS) {
    const { value, name } = payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (type === ACTIONS.FILTER_PRODUCTS) {
    const tempProducts = filterProducts(state);
    return { ...state, filtered_products: tempProducts };
  }

  if (type === ACTIONS.SORT_PRODUCTS) {
    const sortedProducts = sortItems(state.sort, state);
    return { ...state, filtered_products: sortedProducts };
  }
  if (type === ACTIONS.CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

// filter_products function////////////////////
const filterProducts = (state) => {
  const { all_products, filters } = state;
  let tempProducts = [...all_products];

  const { text, category, company, color, price, shipping } = filters;
  if (text) {
    tempProducts = tempProducts.filter((product) => {
      return product.name.toLowerCase().includes(text);
    });
  }
  if (category !== 'all') {
    tempProducts = tempProducts.filter(
      (product) => product.category === category
    );
  }

  if (company !== 'all') {
    tempProducts = tempProducts.filter(
      (product) => product.company.toLowerCase() === company.toLowerCase()
    );
  }

  if (color !== 'all') {
    tempProducts = tempProducts.filter((product) => {
      return product.colors.find((col) => col === color);
    });
  }

  if (price) {
    tempProducts = tempProducts.filter((product) => product.price <= price);
  }

  if (shipping) {
    tempProducts = tempProducts.filter((product) => product.shipping === true);
  }
  return tempProducts;
};

// sort_products function////////////////////
const sortItems = (param, state) => {
  const { filtered_products } = state;
  let tempProducts = [...filtered_products];

  if (param === 'price-lowest') {
    tempProducts = tempProducts.sort((a, b) => a.price - b.price);
  }
  if (param === 'price-highest') {
    tempProducts = tempProducts.sort((a, b) => b.price - a.price);
  }
  if (param === 'name-a') {
    tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (param === 'name-z') {
    tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name));
  }
  return tempProducts;
};

export default filter_reducer;
