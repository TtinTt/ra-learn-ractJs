const initialState = {
  cart: [
    {
      id: 1,
      title: "sản phẩm 1",
      description: "mô tả sp1",
      quantity: 1,
      price: "12",
    },
    {
      id: 2,
      title: "sản phẩm 2",
      description: "mô tả sp2",
      quantity: 2,
      price: "13",
    },
  ],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_PRODUCT_CART":
      const updateCartList2 = state.cart.filter(
        (product) => product.id !== action.payload
      );
      return {
        ...state,
        cart: updateCartList2,
      };
    case "INCREMENT_QUANTITY_CART":
      const updatedProductList = state.cart.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        } else {
          return product;
        }
      });
      return {
        ...state,
        cart: updatedProductList,
      };
    case "DECREMENT_QUANTITY_CART":
      const updateCartListDecrement = state.cart.map((product) => {
        if (product.id === action.payload) {
          if (product.quantity == 1) {
            return {
              ...product,
              quantity: 1,
            };
          } else {
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          }
        } else {
          return product;
        }
      });
      return {
        ...state,
        cart: updateCartListDecrement,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    default:
      return state;
  }
};
export default cartReducer;
