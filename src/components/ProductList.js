import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showProduct } from "../actions/productAction";
import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { addToCart } from "../actions/productAction";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import ProductDetail from "./ProductDetail";
import "../css/ProductList.css";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";

export default function ProductList() {
  const productList = useSelector((state) => state.productReducer.products);
  const searchFilter =
    useSelector((state) => state.productReducer.searchFilter) ?? "";

  const dispatch = useDispatch();

  // console.log(productList);

  const handleSetProductShow = (Product) => {
    dispatch(showProduct(Product));
  };

  //   show Product đầu tiên trong list
  useEffect(() => {
    handleSetProductShow(productList[0]);
  }, []);

  const removeAccentsUpperCase = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toUpperCase();
  };

  // const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (event, productId) => {
    const qlt = Number(event.target.value);
    console.log(qlt);

    if (qlt > 0) {
      productList.map((product, index) => {
        if (product.id == productId) {
          return { ...product, cartQuantity: qlt };
        } else {
          return product;
        }
      });
    }
  };

  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

  const products = productList.map((product, index) => {
    return (
      (removeAccentsUpperCase(product.name).includes(
        removeAccentsUpperCase(searchFilter).toLowerCase()
      ) ||
        removeAccentsUpperCase(product.company.name).includes(
          removeAccentsUpperCase(searchFilter).toLowerCase()
        )) && <ProductDetail product={product} />
    );
  });

  return <>{products}</>;
}
