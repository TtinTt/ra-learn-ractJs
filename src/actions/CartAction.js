export const incrementQuantityCart = (productID) => {
  return {
    type: "INCREMENT_QUANTITY_CART",
    payload: productID,
  };
};

export const decrementQuantityCart = (productID) => {
  return {
    type: "DECREMENT_QUANTITY_CART",
    payload: productID,
  };
};

export const deleteProductCart = (productID) => {
  return {
    type: "DELETE_PRODUCT_CART",
    payload: productID,
  };
};

export const saveProductCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));

  return {
    type: "SAVE_PRODUCT_CART",
    payload: cart,
  };
};
