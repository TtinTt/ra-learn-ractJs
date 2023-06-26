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
    await console.log(productID);
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

  const handleShowAddProduct = () => {
    console.log("show add product");
    handleAddProduct();
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
          <p className="productDes">{product.description}</p>
        </td>
        <td>
          <div className="groupQ" style={{ margin: "10px 0 0 0" }}>
            <button
              className="buttonMain"
              style={{ margin: "0" }}
              onClick={() => handleShowEditProduct(product.id)}
            >
              Edit
            </button>
          </div>

          <button
            className="buttonMain"
            onClick={() => handleDeleteProduct(product.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ) : (
      <EditProductShow
        productInput={product}
        onHideEditProduct={handleHideEditProduct}
      />
    );
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
