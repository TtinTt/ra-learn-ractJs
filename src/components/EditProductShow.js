import React, { useState } from "react";
import "./Components.css";
import { useSelector, useDispatch } from "react-redux";

import { updateEditProduct } from "../actions/productsManageAction";
export default function EditProductShow({ productInput, onHideEditProduct }) {
  const [product, setProduct] = useState(productInput);

  let handleGetInput = async (event) => {
    let productEdit = product;

    productEdit[event.target.name] = event.target.value;

    await setProduct({ ...productEdit });
  };
  const dispatch = useDispatch();

  const handleUpdateEditProduct = async (product) => {
    dispatch(updateEditProduct(product));
    await console.log(product);
    onHideEditProduct();
  };

  return (
    <tr className="productInfo">
      <td>
        <h4 className="titleProduct">#{product.id}</h4>
      </td>
      <td id="editProductCard" colSpan={2}>
        <table>
          <tr>
            <td>
              <h4 className="titleProduct">Title:</h4>
            </td>
            <td>
              <input
                name="title"
                onChange={(event) => {
                  handleGetInput(event);
                }}
                value={product.title}
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              <p className="productDes">Description :</p>
            </td>
            <td>
              <input
                name="description"
                onChange={(event) => {
                  handleGetInput(event);
                }}
                value={product.description}
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              <p className="productDes">Price :</p>
            </td>
            <td>
              <input
                name="price"
                onChange={(event) => {
                  handleGetInput(event);
                }}
                value={product.price}
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              <p className="productDes">Photo :</p>
            </td>
            <td>
              <input
                name="photo"
                onChange={(event) => {
                  handleGetInput(event);
                }}
                value={product.photo}
              ></input>
            </td>
          </tr>
        </table>
      </td>
      <td>
        <button
          className="buttonMain"
          style={{ margin: "10px 0  0 10px" }}
          onClick={() => handleUpdateEditProduct(product)}
        >
          Update
        </button>

        <button
          style={{ margin: "5px 0  0 10px" }}
          className="buttonMain"
          onClick={() => onHideEditProduct()}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
}
