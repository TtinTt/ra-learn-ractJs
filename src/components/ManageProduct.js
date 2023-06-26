import { useSelector, useDispatch } from "react-redux";
import {
  addProduct,
  deleteProduct,
  editProduct,
} from "../actions/productsManageAction";
import React, { useState } from "react";
import "./Components.css";
import { Link } from "react-router-dom";
import EditProductShow from "./EditProductShow";

export default function ManageProduct() {
  // lấy về state.todos từ store
  const products = useSelector((state) => state.listProductReducer.products);
  let cart = useSelector((state) => state.cartReducer.cart);

  let isAdmin = true;
  const dispatch = useDispatch();

  const handleDeleteProduct = async (productID) => {
    dispatch(deleteProduct(productID));
    await console.log(products);
  };

  const [idDelete, setIdDelete] = useState("");
  const handleShowDeleteProduct = (productID) => {
    setIdDelete(productID);
  };
  const handleHideDeleteProduct = () => {
    console.log("123");
    setIdDelete("");
  };

  const [idEdit, setIdEdit] = useState("");

  const handleShowEditProduct = (productID) => {
    setIdEdit(productID);

    console.log(productID);
  };

  const handleHideEditProduct = () => {
    console.log("123");
    setIdEdit("");
  };
  const [isAddingProduct, setIisAddingProduct] = useState(true);

  const handleShowAddProduct = () => {
    isAddingProduct = !isAddingProduct;
  };
  const handleAddProduct = () => {
    dispatch(addProduct());
  };

  const productlist = products.map((product) => {
    return idEdit !== product.id ? (
      <tr className="productInfo">
        <td>
          <h4 className="tittleProduct">#{product.id}</h4>
        </td>
        <td style={{ width: "60px" }}>
          <img className="productPhotoThumb" src={product.photo}></img>
        </td>
        <td>
          <h4 className="tittleProduct">{product.title}</h4>
          <p className="productDes">
            {" "}
            {product.price} USD - {product.description}
          </p>
        </td>
        {product.id != idDelete ? (
          <td>
            <button
              className="buttonMain"
              style={{ margin: "10px 0  0 10px" }}
              onClick={() => handleShowEditProduct(product.id)}
            >
              Edit
            </button>

            <button
              style={{ margin: "5px 0  0 10px" }}
              className="buttonMain"
              onClick={() => handleShowDeleteProduct(product.id)}
            >
              Delete
            </button>
          </td>
        ) : (
          <td>
            <button
              style={{ margin: "10px 0  0 10px" }}
              className="buttonMain"
              onClick={() => handleDeleteProduct(product.id)}
            >
              Confirm
            </button>{" "}
            <button
              style={{ margin: "5px 0  0 10px" }}
              className="buttonMain"
              onClick={() => handleHideDeleteProduct(product.id)}
            >
              Cancel
            </button>
          </td>
        )}
      </tr>
    ) : (
      <EditProductShow
        productInput={product}
        onHideEditProduct={handleHideEditProduct}
      />
    );
  });

  // viết thêm phần add product
  const productAdd = products.map((product) => {
    return <p>Show add product</p>;
  });
  return (
    <>
      <div className="List-Products">
        <h1>
          Manage Products
          {isAdmin == true && (
            <span>
              <Link to="/manage-product" className="float-end">
                <button
                  onClick={() => handleShowAddProduct()}
                  className="buttonTopbar"
                >
                  Add Product
                </button>
              </Link>
            </span>
          )}
          <span>
            <Link to="/" className="float-end">
              <button className="buttonHome">Home</button>
            </Link>
          </span>
        </h1>

        {isAddingProduct ?? productAdd}

        <div>
          <table>
            <thead style={{ color: "salmon" }}>
              <tr>
                <th>#</th>
                <th style={{ width: "60px" }}>Photo</th>
                <th>Description</th>

                <th>Action</th>
              </tr>
            </thead>
            {productlist}
          </table>
        </div>
      </div>
    </>
  );
}
