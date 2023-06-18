const initialState = {
  products: [
    {
      id: 1,
      title: "sản phẩm 1",
      description: "mô tả sp1",
      quantity: 1,
      price: "12",
      photo:
        "https://cdn.tgdd.vn/Products/Images/54/236026/tai-nghe-bluetooth-airpods-pro-apple-mwp22-thumb-1-600x600.jpg",
    },
  ],
};

const listProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "INCREMENT_QUANTITY":
      const updatedProductList = state.products.map((product) => {
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
        products: updatedProductList,
      };
    case "DECREMENT_QUANTITY":
      const updatedProductList2 = state.products.map((product) => {
        if (product.id === action.payload) {
          if (product.quantity == 1) {
            return {
              ...product,
              quantity: 1,
            };
          } else {
            {
              return {
                ...product,
                quantity: product.quantity - 1,
              };
            }
          }
        } else {
          return product;
        }
      });
      return {
        ...state,
        products: updatedProductList2,
      };
    default:
      return state;
  }
};
export default listProductReducer;
