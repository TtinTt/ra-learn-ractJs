const initialState = {
  products: JSON.parse(localStorage.getItem("products")) ?? [
    {
      id: 1,
      title: "Air Pods Pro",
      description:
        "Lorem ipsum dolor sit amet. consectetur adipisicing elt. At dicts asperiores veniam repellat unde debitis quisquam magnam magni ut delenti!",
      quantity: 1,
      price: "12",
      photo:
        "https://cdn.tgdd.vn/Products/Images/54/236026/tai-nghe-bluetooth-airpods-pro-apple-mwp22-thumb-1-600x600.jpg",
    },
    {
      id: 2,
      title: "Macbook",
      description:
        "Lorem ipsum dolor sit amet. consectetur adipisicing elt. At dicts asperiores veniam repellat unde debitis quisquam magnam magni ut delenti!",
      quantity: 1,
      price: "12",
      photo:
        "https://itechmobile.vn/wp-content/uploads/2022/09/733301937685-MBA-M1-1024x659.jpg",
    },
    {
      id: 3,
      title: "Iphone 14 Promax",
      description:
        "Lorem ipsum dolor sit amet. consectetur adipisicing elt. At dicts asperiores veniam repellat unde debitis quisquam magnam magni ut delenti!",
      quantity: 1,
      price: "12",
      photo:
        "https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg",
    },
    ,
    {
      id: 4,
      title: "Samsung Galaxy S22 Ultra",
      description:
        "Lorem ipsum dolor sit amet. consectetur adipisicing elt. At dicts asperiores veniam repellat unde debitis quisquam magnam magni ut delenti!",
      quantity: 1,
      price: "12",
      photo:
        "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/s/m/sm-s908_galaxys22ultra_front_phantomblack_211119.jpg",
    },
    ,
  ],
};

const listProductReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case "DELETE_PRODUCT":
      const ProductListDeleted = state.products.filter(
        (product) => product.id !== action.payload
      );
      // console.log(ProductListDeleted);
      localStorage.setItem("products", JSON.stringify(ProductListDeleted));

      return {
        ...state,
        products: ProductListDeleted,
      };
    case "ADD_TO_CART":
      const updatedProductListATC = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            quantity: 1,
          };
        } else {
          return product;
        }
      });
      return {
        ...state,
        products: updatedProductListATC,
      };
    case "UPDATE_EDIT_PRODUCT":
      const updatedProductListEdit = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...action.payload,
          };
        } else {
          return product;
        }
      });
      localStorage.setItem("products", JSON.stringify(updatedProductListEdit));

      return {
        ...state,
        products: updatedProductListEdit,
      };
    default:
      return state;
  }
};
export default listProductReducer;
