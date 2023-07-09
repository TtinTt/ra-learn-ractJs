import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Changedot, getCurrentTimeString } from "../../function/functionData";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import NavbarFilter from "../NavbarFilter";
import Modal from "react-bootstrap/Modal";
import { HandleFilter } from "../../function/functionData";
import "../../css/Cart.css";
import ProductCardAdmin from "./ProductCardAdmin";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";

export default function ManageProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productListStore = useSelector(
    (state) => state.productReducer.products
  );

  const productList = HandleFilter(productListStore);

  const [productDescription, setProductDescription] = useState("");

  // Pagination phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = productList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const renderProducts = currentProducts.map((product, index) => {
    return (
      <ProductCardAdmin
        key={index}
        render={"productCard"}
        i={index}
        product={product}
      />
    );
  });

  // làm tròn
  const totalPages = Math.ceil(productList.length / productsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // khi 1 trong các biến phụ [currentPage, productList, indexOfFirstProduct, indexOfLastProduct]
  // thay đổi sẽ chạy lại để lấy giá trị mới nhất
  useEffect(() => {
    const description = `Đang hiển thị sản phẩm thứ ${
      indexOfFirstProduct + 1
    } đến ${
      indexOfLastProduct > productList.length
        ? productList.length
        : indexOfLastProduct
    } trong tổng số ${productList.length} sản phẩm`;
    setProductDescription(description);
  }, [currentPage, productList, indexOfFirstProduct, indexOfLastProduct]);

  // Pagination phân trang
  const PaginationSet = () => {
    return (
      <div id="paginationSet">
        {renderProducts.length > 0 ? (
          <p id="statusPagination">{productDescription}</p>
        ) : (
          <p id="statusPagination">
            Không có sản phẩm nào giống như bạn đang tìm kiếm
          </p>
        )}

        {totalPages !== 1 && (
          <Pagination id="pagination">
            <Pagination.First
              onClick={() => changePage(1)}
              disabled={currentPage === 1}
            />

            <Pagination.Prev
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            />

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <Pagination.Item
                  key={number}
                  active={number === currentPage}
                  onClick={() => changePage(number)}
                >
                  {number}
                </Pagination.Item>
              )
            )}

            <Pagination.Next
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            />

            <Pagination.Last
              onClick={() => changePage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        )}
      </div>
    );
  };

  let draftProduct = {
    id: uuidv4(),
    name: "",
    img: [""],
    tag: [],
    price: "",
    comparative: "",
    sku: "",
    description: "",
  };
  return (
    <>
      <NavbarFilter />
      {renderProducts.length > 8 && PaginationSet()}
      {renderProducts.length !== 0 && (
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th
                className="text-left position-relative"
                colSpan={2}
                style={{ padding: "auto" }}
              >
                <h6
                  className="position-relative"
                  style={{
                    top: "13px",
                    padding: "auto",
                    display: "inline-block",
                  }}
                >
                  {" "}
                  Thông tin sản phẩm{" "}
                </h6>
                <span style={{ float: "right" }}>
                  <ProductCardAdmin
                    key={0}
                    render={"addProduct"}
                    i={0}
                    product={draftProduct}
                  />
                </span>
              </th>
              <th className="text-center">Giá</th>
              <th className="text-center">Giá so sánh</th>
              <th className="text-center">SKU</th>
              <th className="text-center">TAG</th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody>{renderProducts}</tbody>
        </Table>
      )}
      {PaginationSet()}{" "}
    </>
  );
}
