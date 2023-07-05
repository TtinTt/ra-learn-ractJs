export const addToCart = (product, quantity) => {
  return {
    type: "ADD_TO_CART",
    payload: {
      ...product,
      quantity,
    },
  };
};

export const deleteFromCart = (id) => {
  return {
    type: "DELETE_FROM_CART",
    payload: id,
  };
};

export const changeQuantity = (id, quantity) => {
  return {
    type: "CHANGE_QUANTITY",
    payload: {
      id: id,
      quantity: quantity,
    },
  };
};
