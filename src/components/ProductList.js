import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showProduct } from "../actions/productAction";
import { useEffect, useState } from "react";
import { addToCart } from "../actions/productAction";
import Button from "react-bootstrap/Button";
import ProductCard from "./ProductCard";
import "../css/ProductList.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";

import { removeAccentsUpperCase, HandleFilter } from "../function/functionData";

export default function ProductList() {
  const productListStore = useSelector(
    (state) => state.productReducer.products
  );

  const productList = HandleFilter(productListStore);

  const dispatch = useDispatch();

  // thêm vào giỏ hàng
  const handleAdd = (product) => {
    dispatch(addToCart(product));
  };

  // Pagination phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // const [currentProducts, setcurrentProducts] = useState(
  //   productList.slice(indexOfFirstProduct, indexOfLastProduct)
  // );

  const currentProducts = productList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const renderProducts = currentProducts.map((product, index) => {
    return (
      <Col>
        <ProductCard key={index} product={product} />
      </Col>
    );
  });

  const totalPages = Math.ceil(productList.length / productsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    // setcurrentProducts(
    //   productList.slice(indexOfFirstProduct, indexOfLastProduct)
    // );
  };
  // Pagination phân trang

  return (
    <>
      <Row xs={1} sm={2} lg={3} xl={3} xxl={4}>
        {renderProducts}
      </Row>
      <div id="paginationSet">
        <p id="statusPagination">
          Đang hiển thị sản phẩm thứ {indexOfFirstProduct + 1} đến{" "}
          {indexOfLastProduct} trong tổng số {productList.length} sản phẩm
        </p>
        <Pagination id="pagination">
          <Pagination.First
            onClick={() => changePage(1)}
            disabled={currentPage === 1}
          />

          <Pagination.Prev
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          />

          {/* console.log(Array.from('foo'));
            // Expected output: Array ["f", "o", "o"]

            console.log(Array.from([1, 2, 3], x => x + x));
            // Expected output: Array [2, 4, 6]
            */}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => changePage(number)}
            >
              {number}
            </Pagination.Item>
          ))}

          <Pagination.Next
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          />

          <Pagination.Last
            onClick={() => changePage(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </>
  );
}
