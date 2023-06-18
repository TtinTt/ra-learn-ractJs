// let cartData = JSON.parse(localStorage.getItem("cart")) ?? [];

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) ?? [],
  isSaved: true,
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
        isSaved: false,
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
        isSaved: false,
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
        isSaved: false,
      };

    case "ADD_TO_CART":
      let flag = false;
      let updatedATC = state.cart.map((product) => {
        if (product.id === action.payload.id) {
          flag = true;
          product.quantity = product.quantity + action.payload.quantity;
        }

        return product;
      });

      if (!flag) {
        updatedATC = [...updatedATC, action.payload];
      }
      return {
        ...state,
        cart: updatedATC,
        isSaved: false,
      };

    case "SAVE_PRODUCT_CART":
      return {
        ...state,
        isSaved: true,
      };

    default:
      return state;
  }
};
export default cartReducer;
