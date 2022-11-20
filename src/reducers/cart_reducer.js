import { ACTIONS } from '../actions';

const cart_reducer = (state, action) => {
  const { payload, type } = action;
  if (type === ACTIONS.ADD_TO_CART) {
    let cartItems = [...state.cart];
    let totalItem = state.total_items;
    let totalAmount = state.total_amount;

    const { amount, color, id, product } = payload;

    const isFound = state.cart.find((item) => item.id === id + color);

    if (isFound) {
      cartItems = state.cart.map((item) => {
        if (item.id === id + color && item.quantity + amount <= product.stock) {
          totalItem = state.total_items + amount;
          totalAmount = state.total_amount + product.price * amount;
          return { ...item, quantity: item.quantity + amount };
        }
        return item;
      });
    } else {
      cartItems = [
        ...state.cart,
        {
          color,
          id: id + color,
          name: product.name,
          quantity: amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        },
      ];
      totalItem = state.total_items + amount;
      totalAmount = state.total_amount + amount * product.price;
    }

    return {
      ...state,
      cart: cartItems,
      total_items: totalItem,
      total_amount: totalAmount,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
