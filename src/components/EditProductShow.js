import React, { useState } from "react";
import "./Components.css";

export default function EditProductShow({ productInput, onHideEditProduct }) {
  const [productSave, setProductSave] = useState(productInput);

  const handleGetInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setProductSave(([name] = value));
    console.log(productSave);
  };

  let product = productInput;
  console.log(product);

  return (
    <tr className="productInfo">
      <td>
        <h4 className="tittleProduct">#{product.id}</h4>
      </td>
      <td id="editProductCard" colSpan={2}>
        <table>
          <tr>
            <td>
              <h4 className="tittleProduct">Title:</h4>
            </td>
            <td>
              <input
                name="title"
                onChangeD={(event) => handleGetInput}
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
                onChange={(event) => handleGetInput}
                value={product.description}
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
                onChange={(event) => handleGetInput}
                value={product.photo}
              ></input>
            </td>
          </tr>
        </table>
      </td>
      <td>
        <div className="groupQ" style={{ margin: "10px 0 0 0" }}>
          <button
            className="buttonMain"
            style={{ margin: "0" }}
            // onClick={() => handleShowEditProduct(product.id)}
          >
            Update
          </button>
        </div>

        <button className="buttonMain" onClick={() => onHideEditProduct()}>
          Cancel
        </button>
      </td>
    </tr>
  );
}
