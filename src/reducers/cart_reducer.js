import { ACTIONS } from '../actions';

const cart_reducer = (state, action) => {
  const { payload, type } = action;

  if (type === ACTIONS.ADD_TO_CART) {
    let cartItems = [...state.cart];

    const { amount, color, id, product } = payload;

    const isFound = state.cart.find((item) => item.id === id + color);

    if (isFound) {
      cartItems = state.cart.map((item) => {
        if (item.id === id + color && item.quantity + amount <= product.stock) {
          return { ...item, quantity: item.quantity + amount };
        }
        return item;
      });
    } else {
      // const isAlreadyInCart = state.cart.reduce((total, current) => {
      //   if (current.name === product.name) {
      //     total = total + current.quantity;
      //   }
      //   return total;
      // }, 0);

      // if (isAlreadyInCart >= product.stock) {
      //   cartItems = [...state.cart];
      //   console.log('ola');
      //   return;
      // }
      console.log(product);
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
    }

    return {
      ...state,
      cart: cartItems,
    };
  }

  if (type === ACTIONS.CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (type === ACTIONS.REMOVE_CART_ITEM) {
    let newCartItems = state.cart.filter((item) => item.id != payload);
    return {
      ...state,
      cart: newCartItems,
    };
  }

  if (type === ACTIONS.COUNT_CART_TOTALS) {
    const { T_item, T_amount } = state.cart.reduce(
      (total, current) => {
        total.T_item += current.quantity;
        total.T_amount += current.quantity * current.price;
        return total;
      },
      { T_item: 0, T_amount: 0 }
    );

    return {
      ...state,
      total_items: T_item,
      total_amount: T_amount,
    };
  }

  if (type === ACTIONS.TOGGLE_CART_ITEM_AMOUNT) {
    const { id, text } = payload;
    const modifiedCart = state.cart.map((item) => {
      if (item.id === id) {
        if (text === 'increase') {
          if (item.quantity < item.max) {
            return { ...item, quantity: item.quantity + 1 };
          }
        } else if (text === 'decrease') {
          if (item.quantity != 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
      }
      return item;
    });
    return { ...state, cart: modifiedCart };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
