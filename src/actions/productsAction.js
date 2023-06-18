export const incrementQuantity = (id) => {
  return {
    type: "INCREMENT_QUANTITY",
    payload: id,
  };
};

export const decrementQuantity = (id) => {
  return {
    type: "DECREMENT_QUANTITY",
    payload: id,
  };
};

export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};
