export const addProduct = () => {
  return {
    type: "ADD_PRODUCT",
    payload: null,
  };
};

export const deleteProduct = (id) => {
  return {
    type: "DELETE_PRODUCT",
    payload: id,
  };
};

export const editProduct = (id) => {
  return {
    type: "EDIT_PRODUCT",
    payload: id,
  };
};

export const updateEditProduct = (product) => {
  return {
    type: "UPDATE_EDIT_PRODUCT",
    payload: product,
  };
};
